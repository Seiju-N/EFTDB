import { useContext, useEffect, useState } from "react";
import { Edge, EdgeProps, Node, NodeProps, useReactFlow } from "reactflow";
import { CustomNode } from "./CustomNodes";
import { CustomEdge } from "./CustomEdge";
import { LanguageDictContext } from "@/App";
import { StyledComponents } from "./StyledComponents";

export const useHooks = () => {
  const { ReactFlowStyled, MiniMapStyled, ControlsStyled } = StyledComponents();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showKappaRequired, setShowKappaRequired] = useState(false);
  const [dataWithKappa, setDataWithKappa] = useState({ nodes: [], edges: [] });
  const [dataWithoutKappa, setDataWithoutKappa] = useState({
    nodes: [],
    edges: [],
  });
  const langDict = useContext(LanguageDictContext);
  const reactFlowInstance = useReactFlow();
  const nodeTypes = {
    custom: (nodeProps: NodeProps) => <CustomNode {...nodeProps} />,
  };

  const edgeTypes = {
    custom: (edgeProps: EdgeProps) => <CustomEdge {...edgeProps} />,
  };

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.setViewport({
        zoom: 0.4,
        x: 40,
        y: 40,
      });
    }
  }, [reactFlowInstance]);

  const fetchData = async (kappaRequiredFilter: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_get_task_tree_prod",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            kappaRequiredFilter: kappaRequiredFilter.toString(),
          },
          mode: "cors",
          credentials: "include",
        }
      );

      if (!response.ok || response.status !== 200) {
        throw new Error("サーバーからのレスポンスが正常ではありません。");
      } else {
        const result = await response.json();
        setDataWithKappa(result.kappa);
        setDataWithoutKappa(result.all);
        if (showKappaRequired) {
          setNodes(result.kappa.nodes);
          setEdges(result.kappa.edges);
        } else {
          setNodes(result.all.nodes);
          setEdges(result.all.edges);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    fetchData(false);
  }, []);

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.setEdges(edges);
    }
  }, [edges, reactFlowInstance]);

  const handleToggleKappaRequired = () => {
    setIsLoading(true);
    setShowKappaRequired((prevShowKappaRequired) => {
      const newShowKappaRequired = !prevShowKappaRequired;
      const data = newShowKappaRequired ? dataWithKappa : dataWithoutKappa;
      setNodes(data.nodes);
      if (reactFlowInstance) {
        reactFlowInstance.setEdges([]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 50);

      return newShowKappaRequired;
    });
  };

  return {
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    isLoading,
    showKappaRequired,
    handleToggleKappaRequired,
    ReactFlowStyled,
    MiniMapStyled,
    ControlsStyled,
    langDict,
  };
};
