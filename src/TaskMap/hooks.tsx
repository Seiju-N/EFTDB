import { useContext, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Edge,
  EdgeProps,
  MiniMap,
  Node,
  NodeProps,
} from "reactflow";
import styled from "styled-components";
import { CustomNode } from "./CustomNodes";
import { CustomEdge } from "./CustomEdge";
import { LanguageDictContext } from "@/App";

const darkTheme = {
  bg: "#000",
  primary: "#ff0072",

  nodeBg: "#343435",
  nodeColor: "#f9f9f9",
  nodeBorder: "#888",

  minimapMaskBg: "#343435",

  controlsBg: "#555",
  controlsBgHover: "#676768",
  controlsColor: "#dddddd",
  controlsBorder: "#676768",
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${darkTheme.bg};
`;

const MiniMapStyled = styled(MiniMap)`
  background-color: ${darkTheme.bg};

  .react-flow__minimap-mask {
    fill: ${darkTheme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${darkTheme.nodeBg};
    stroke: none;
  }
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${darkTheme.controlsBg};
    color: ${darkTheme.controlsColor};
    border-bottom: 1px solid ${darkTheme.controlsBorder};

    &:hover {
      background-color: ${darkTheme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: {
      taskName: "Node 1",
      minPlayerLevel: 1,
      kappaRequired: true,
      traderName: "Prapor",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      taskName: "Node 2",
      minPlayerLevel: 2,
      kappaRequired: false,
      traderName: "Therapist",
    },
    position: { x: 200, y: 0 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "1",
    target: "2",
    type: "custom",
  },
];

export const useHooks = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isLoading, setIsLoading] = useState(true);
  const [showKappaRequired, setShowKappaRequired] = useState(false);
  const langDict = useContext(LanguageDictContext);
  const nodeTypes = {
    custom: (nodeProps: NodeProps) => (
      <CustomNode {...nodeProps} showKappa={showKappaRequired} />
    ),
  };

  const edgeTypes = {
    custom: (edgeProps: EdgeProps) => (
      <CustomEdge {...edgeProps} showKappaRequired={showKappaRequired} />
    ),
  };

  const handleToggleKappaRequired = () => {
    setShowKappaRequired(!showKappaRequired);
  };

  useEffect(() => {
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
          const { nodes, edges } = await response.json();
          setNodes(nodes);
          setEdges(edges);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    isLoading,
    showKappaRequired,
    handleToggleKappaRequired,
    darkTheme,
    ReactFlowStyled,
    MiniMapStyled,
    ControlsStyled,
    langDict,
  };
};
