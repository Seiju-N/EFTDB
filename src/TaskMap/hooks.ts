import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dagre from "dagre";
import { Edge, Node, NodeProps, Position } from "reactflow";
import { CustomNode } from "./CustomNodes";
import { CustomEdge } from "./CustomEdge";
import { CategoryContext, LanguageContext, LanguageDictContext } from "@/App";
import { GetTestDummy } from "./GetTestDummy";
import { useTaskMap } from "@/contexts/TaskMapContext";
import { useTasks } from "@/api/hooks";


const NODE_WIDTH = 200;
const NODE_HEIGHT = 30;

type dataType = {
  nodes: Node[];
  edges: Edge[];
};

const areEqual = (prevProps: NodeProps, nextProps: NodeProps) => {
  return prevProps.id === nextProps.id && prevProps.data === nextProps.data;
};

const MemoizedCustomNode = memo(CustomNode, areEqual);
const MemoizedCustomEdge = memo(CustomEdge);
const nodeTypes = {
  custom: MemoizedCustomNode,
};

const edgeTypes = {
  custom: MemoizedCustomEdge,
};

// A fresh graph per call avoids carrying nodes/edges over between the
// kappa-only and full-task layouts (they used to share one long-lived
// dagre.Graph, which made every later layout slower and could mislayout).
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "LR", ranksep: 560, nodesep: 80 });

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
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
    let xPosition = nodeWithPosition.x - NODE_WIDTH / 2;
    if (node.data.taskName === "Collector") {
      xPosition += 4000;
    }
    node.position = {
      x: xPosition,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };
  });
  return { nodes, edges };
};

export const useHooks = () => {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedTaskId,
    openTaskModal,
    closeTaskModal,
  } = useTaskMap();
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
  const lang = useContext(LanguageContext);
  const categories = useContext(CategoryContext);
  const { data: taskData } = useTasks(lang);

  const selectedTask = useMemo(
    () => taskData?.tasks.find((task) => task.id === selectedTaskId),
    [taskData, selectedTaskId]
  );

  const getSavedNodes = useCallback(() => {
    return JSON.parse(localStorage.getItem("checkedNodes") || "{}");
  }, []);

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
        const savedNodes = getSavedNodes();
        const addCheckedStatus = (node: Node) => ({
          ...node,
          data: {
            ...node.data,
            isNodeChecked: !!savedNodes[node.id],
          },
        });

        const updatedKappaNodes = result.kappa.nodes.map(addCheckedStatus);
        const updatedAllNodes = result.all.nodes.map(addCheckedStatus);

        const layoutedKappa = getLayoutedElements(updatedKappaNodes, result.kappa.edges);
        const layoutedAll = getLayoutedElements(updatedAllNodes, result.all.edges);
        setDataWithKappa(layoutedKappa);
        setDataWithoutKappa(layoutedAll);
        setNodes(showKappaRequired ? layoutedKappa.nodes : layoutedAll.nodes);
        setEdges(showKappaRequired ? layoutedKappa.edges : layoutedAll.edges);
      }
    } catch (err) {
      console.error(err);
      const result = GetTestDummy();
      const savedNodes = getSavedNodes();
      const addCheckedStatus = (node: Node) => ({
        ...node,
        data: {
          ...node.data,
          isNodeChecked: !!savedNodes[node.id],
        },
      });

      const updatedKappaNodes = result.kappa.nodes.map(addCheckedStatus);
      const updatedAllNodes = result.all.nodes.map(addCheckedStatus);
      const layoutedKappa = getLayoutedElements(updatedKappaNodes, result.kappa.edges);
      const layoutedAll = getLayoutedElements(updatedAllNodes, result.all.edges);
      setDataWithKappa(layoutedKappa);
      setDataWithoutKappa(layoutedAll);
      setNodes(showKappaRequired ? layoutedKappa.nodes : layoutedAll.nodes);
      setEdges(showKappaRequired ? layoutedKappa.edges : layoutedAll.edges);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setIsLoading(true);
      setShowKappaRequired(checked);

      const savedNodes = getSavedNodes();
      const currentData = checked ? dataWithKappa : dataWithoutKappa;
      const updatedNodes = currentData.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isNodeChecked: savedNodes[node.id] ?? node.data.isNodeChecked,
        },
      }));

      setNodes(updatedNodes);
      setEdges(currentData.edges);
      //NOTE: 一旦ロード画面を挟まないとEdgeの表示がおかしくなるため
      setTimeout(() => {
        setIsLoading(false);
      }, 4);
    },
    [dataWithKappa, dataWithoutKappa, setNodes, setEdges]
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
    lang,
    categories,
    selectedTask,
    isTaskModalOpen: selectedTaskId !== null,
    openTaskModal,
    closeTaskModal,
  };
};
