import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Edge, MiniMap, Node } from "reactflow";
import { CustomNode } from "./CustomNodes";
import "reactflow/dist/style.css";
import styled from "styled-components";
import { Box } from "@mui/material";

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
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Node 2" },
    position: { x: 200, y: 0 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "1",
    target: "2",
  },
];
export const TaskMap2 = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isLoading, setIsLoading] = useState(true);
  const nodeTypes = {
    custom: CustomNode,
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

  console.log(nodes, edges);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box sx={{ height: "80vh", width: "100vw", overflow: "hidden" }}>
      <ReactFlowStyled
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMapStyled />
        <ControlsStyled />
      </ReactFlowStyled>
    </Box>
  );
};
