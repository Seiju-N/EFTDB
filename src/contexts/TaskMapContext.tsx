import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Edge, Node } from "reactflow";

type Props = {
  children: React.ReactNode;
};

type TaskMapContextType = {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  updateNodeAndParents: (nodeId: string, checked: boolean) => void;
  isPending: boolean;
};
const TaskMapContext = createContext<TaskMapContextType | undefined>(undefined);

export const TaskMapProvider = ({ children }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const updateNodeCheckStatus = useCallback(
    (nodeId: string, isChecked: boolean) => {
      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, isNodeChecked: isChecked },
            };
          }
          return node;
        });
      });
    },
    [setNodes]
  );

  const updateNodeAndParents = useCallback(
    (nodeId: string, checked: boolean) => {
      startTransition(() => {
        const updatedCheckedNodes = JSON.parse(
          localStorage.getItem("checkedNodes") || "{}"
        );

        const updateChildren = (id: string) => {
          edges
            .filter((edge) => edge.source === id)
            .forEach((edge) => {
              updateNodeCheckStatus(edge.target, false);
              delete updatedCheckedNodes[edge.target];
              updateChildren(edge.target);
            });
        };

        const updateParents = (id: string) => {
          const nodeIndex = nodes.findIndex((node) => node.id === id);
          if (nodeIndex !== -1) {
            updateNodeCheckStatus(nodes[nodeIndex].id, checked);

            if (checked) {
              updatedCheckedNodes[id] = true;
              edges
                .filter((edge) => edge.target === id)
                .forEach((edge) => {
                  updateParents(edge.source);
                });
            } else {
              delete updatedCheckedNodes[id];
              updateChildren(id);
            }
          }
        };

        updateParents(nodeId);
        localStorage.setItem(
          "checkedNodes",
          JSON.stringify(updatedCheckedNodes)
        );
      });
    },
    [nodes, edges, updateNodeCheckStatus]
  );
  const value = {
    nodes,
    setNodes,
    edges,
    setEdges,
    updateNodeAndParents,
    isPending,
  };

  useEffect(() => {
    const findParentNodes = (nodeId: string) => {
      return edges
        .filter((edge) => edge.target === nodeId)
        .map((edge) => edge.source);
    };

    const updateParentNodes = (updatedNode: Node) => {
      const parentIds = findParentNodes(updatedNode.id);
      let updated = false;

      const newNodes = nodes.map((node) => {
        if (parentIds.includes(node.id) && !node.data.isNodeChecked) {
          updated = true;
          return { ...node, data: { ...node.data, isNodeChecked: true } };
        }
        return { ...node, data: { ...node.data, isNodeChecked: false } };
      });

      if (updated) {
        setNodes(newNodes);
      }
    };

    nodes.forEach((node) => {
      if (node.data.isNodeChecked) {
        updateParentNodes(node);
      }
    });
  }, [nodes, edges, setNodes]);

  return (
    <TaskMapContext.Provider value={value}>{children}</TaskMapContext.Provider>
  );
};

export const useTaskMap = () => {
  const context = useContext(TaskMapContext);
  if (!context) {
    throw new Error("useTaskMap must be used within a TaskMapProvider");
  }
  return context;
};
