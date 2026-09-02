import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://json.tarkov.dev";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonNode = any;

/**
 * Minimal JSONPath-subset walker for json.tarkov.dev's `translations` field.
 * Supports the segment forms actually observed across its datasets:
 *   .key            plain property access
 *   .*  / [*]       wildcard over every key of an object or every index of an array
 *   ['a','b']       bracket key-list (visit only the named keys, if present)
 *   ..key           recursive descent (find `key` at any depth below the current node)
 * Unsupported/malformed paths are skipped rather than throwing, since a single
 * bad path shouldn't break translation of the other ~20 fields in a dataset.
 */
type Segment =
  | { kind: "key"; key: string }
  | { kind: "wildcard" }
  | { kind: "keyList"; keys: string[] }
  | { kind: "descend"; key: string };

const parseJsonPath = (path: string): Segment[] => {
  const segments: Segment[] = [];
  // Drop the leading "$" root marker.
  let rest = path.startsWith("$") ? path.slice(1) : path;
  const tokenPattern = /^(?:\.\.(\w+))|^(?:\.(\*|\w+))|^(?:\[\*\])|^(?:\[((?:'[^']*'\s*,?\s*)+)\])/;
  while (rest.length > 0) {
    const match = tokenPattern.exec(rest);
    if (!match) break;
    const [full, descendKey, dotKey, ] = match;
    if (descendKey) {
      segments.push({ kind: "descend", key: descendKey });
    } else if (dotKey === "*") {
      segments.push({ kind: "wildcard" });
    } else if (dotKey) {
      segments.push({ kind: "key", key: dotKey });
    } else if (full === "[*]") {
      segments.push({ kind: "wildcard" });
    } else if (match[3]) {
      const keys = match[3]
        .split(",")
        .map((s) => s.trim().replace(/^'|'$/g, ""))
        .filter(Boolean);
      segments.push({ kind: "keyList", keys });
    }
    rest = rest.slice(full.length);
  }
  return segments;
};

const collectDescendants = (node: JsonNode, key: string, out: { parent: JsonNode; key: string }[]) => {
  if (!node || typeof node !== "object") return;
  for (const k of Object.keys(node)) {
    if (k === key) out.push({ parent: node, key: k });
    else collectDescendants(node[k], key, out);
  }
};

const walk = (
  node: JsonNode,
  segments: Segment[],
  onLeaf: (parent: JsonNode, key: string) => void
) => {
  if (node === null || node === undefined) return;
  if (segments.length === 0) return;
  const [seg, ...remaining] = segments;
  const isLastSegment = remaining.length === 0;

  const visit = (parent: JsonNode, key: string) => {
    if (isLastSegment) {
      onLeaf(parent, key);
    } else if (typeof parent[key] === "object" && parent[key] !== null) {
      walk(parent[key], remaining, onLeaf);
    }
  };

  switch (seg.kind) {
    case "key":
      if (typeof node === "object" && seg.key in node) visit(node, seg.key);
      break;
    case "wildcard":
      if (Array.isArray(node)) {
        node.forEach((_, idx) => visit(node, String(idx)));
      } else if (typeof node === "object") {
        Object.keys(node).forEach((k) => visit(node, k));
      }
      break;
    case "keyList":
      seg.keys.forEach((k) => {
        if (typeof node === "object" && node !== null && k in node) visit(node, k);
      });
      break;
    case "descend": {
      const found: { parent: JsonNode; key: string }[] = [];
      collectDescendants(node, seg.key, found);
      found.forEach(({ parent, key }) => visit(parent, key));
      break;
    }
  }
};

export const applyTranslations = (
  data: JsonNode,
  paths: string[],
  dict: Record<string, string>
): void => {
  paths.forEach((path) => {
    try {
      const segments = parseJsonPath(path);
      walk(data, segments, (parent, key) => {
        const value = parent[key];
        if (typeof value === "string" && Object.prototype.hasOwnProperty.call(dict, value)) {
          parent[key] = dict[value];
        }
      });
    } catch {
      // Skip malformed/unsupported paths — the rest still translate correctly.
    }
  });
};

const datasetCache = new Map<string, Promise<JsonNode>>();

const fetchJson = async (path: string): Promise<JsonNode> => {
  const res = await fetch(`${BASE_URL}/${path}`);
  if (!res.ok) throw new Error(`json.tarkov.dev request failed: ${path} (${res.status})`);
  return res.json();
};

/**
 * Fetches a json.tarkov.dev dataset, merging in real translated strings for
 * every field the dataset marks as translatable (placeholder values otherwise).
 * Results are memoized per path+lang so repeated hook calls share one fetch.
 */
export const fetchDataset = (path: string, lang: string): Promise<JsonNode> => {
  const cacheKey = `${path}:${lang}`;
  const cached = datasetCache.get(cacheKey);
  if (cached) return cached;

  const promise = (async () => {
    const base = await fetchJson(path);
    const translationPaths: string[] = base.translations || [];
    if (translationPaths.length > 0) {
      const enDictPromise = fetchJson(`${path}_en`).catch(() => ({ data: {} }));
      const langDictPromise =
        lang !== "en" ? fetchJson(`${path}_${lang}`).catch(() => ({ data: {} })) : Promise.resolve({ data: {} });
      const [enDict, langDict] = await Promise.all([enDictPromise, langDictPromise]);
      const dict: Record<string, string> = { ...(enDict.data || {}), ...(langDict.data || {}) };
      applyTranslations(base, translationPaths, dict);
    }
    return base.data;
  })();

  datasetCache.set(cacheKey, promise);
  promise.catch(() => datasetCache.delete(cacheKey));
  return promise;
};

type AsyncState<T> = {
  data: T | undefined;
  loading: boolean;
  error: unknown;
};

/**
 * Apollo-`useQuery`-shaped async hook: runs `factory` whenever `deps` change
 * and exposes `{data, loading, error}`, ignoring results from stale runs.
 */
export const useAsync = <T,>(factory: () => Promise<T>, deps: React.DependencyList): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({ data: undefined, loading: true, error: undefined });
  const runId = useRef(0);

  useEffect(() => {
    const id = ++runId.current;
    setState((prev) => ({ ...prev, loading: true }));
    factory()
      .then((data) => {
        if (runId.current === id) setState({ data, loading: false, error: undefined });
      })
      .catch((error) => {
        if (runId.current === id) setState({ data: undefined, loading: false, error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};
