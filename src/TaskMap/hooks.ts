import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dagre from "dagre";
import { Edge, Node, Position } from "reactflow";
import { CustomNode } from "./CustomNodes";
import { CustomEdge } from "./CustomEdge";
import { LanguageDictContext } from "@/App";
import { GetTestDummy } from "./GetTestDummy";

type dataType = {
  nodes: Node[];
  edges: Edge[];
};

export const useHooks = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showKappaRequired, setShowKappaRequired] = useState(false);
  const [dataWithKappa, setDataWithKappa] = useState<dataType>({
    nodes: [],
    edges: [],
  });
  const [dataWithoutKappa, setDataWithoutKappa] = useState<dataType>({
    nodes: [],
    edges: [],
  });
  const langDict = useContext(LanguageDictContext);
  const MemoizedCustomNode = memo(CustomNode);
  const MemoizedCustomEdge = memo(CustomEdge);
  const nodeTypes = {
    custom: MemoizedCustomNode,
  };

  const edgeTypes = {
    custom: MemoizedCustomEdge,
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 200;
  const nodeHeight = 30;

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    dagreGraph.setGraph({ rankdir: "LR", ranksep: 600, nodesep: 60 });

    nodes.forEach((node: Node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: Edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: Node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      if (!nodeWithPosition) {
        console.error("Node with ID not found in Dagre graph:", node.id);
        return;
      }
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;
      let xPosition = nodeWithPosition.x - nodeWidth / 2;
      if (node.data.taskName === "Collector") {
        xPosition += 4000;
      }
      node.position = {
        x: xPosition,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    });
    return { nodes, edges };
  };

  const layoutedElements = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_get_task_tree_prod",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }
      );

      if (!response.ok || response.status !== 200) {
        throw new Error("サーバーからのレスポンスが正常ではありません。");
      } else {
        const result = await response.json();
        const layoutedKappa = getLayoutedElements(
          result.kappa.nodes,
          result.kappa.edges
        );
        const layoutedAll = getLayoutedElements(
          result.all.nodes,
          result.all.edges
        );
        setDataWithKappa(layoutedKappa);
        setDataWithoutKappa(layoutedAll);
        if (showKappaRequired) {
          setNodes(layoutedKappa.nodes);
          setEdges(layoutedKappa.edges);
        } else {
          setNodes(layoutedAll.nodes);
          setEdges(layoutedAll.edges);
        }
      }
    } catch (err) {
      console.error(err);
      const result = GetTestDummy();
      const layoutedKappa = getLayoutedElements(
        result.kappa.nodes,
        result.kappa.edges
      );
      const layoutedAll = getLayoutedElements(
        result.all.nodes,
        result.all.edges
      );
      setDataWithKappa(layoutedKappa);
      setDataWithoutKappa(layoutedAll);
      if (showKappaRequired) {
        setNodes(layoutedKappa.nodes);
        setEdges(layoutedKappa.edges);
      } else {
        setNodes(layoutedAll.nodes);
        setEdges(layoutedAll.edges);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = layoutedElements;
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [layoutedElements]);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setIsLoading(true);
      setShowKappaRequired(checked);

      const data = checked ? dataWithKappa : dataWithoutKappa;
      setNodes(data.nodes);
      setEdges(data.edges);

      setTimeout(() => {
        setIsLoading(false);
      }, 4);
    },
    [dataWithKappa, dataWithoutKappa]
  );

  return {
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    isLoading,
    showKappaRequired,
    handleCheckboxChange,
    langDict,
  };
};
