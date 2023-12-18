import { Typography } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";

const Node = styled.div<{
  selected: boolean;
  kappa_required?: string;
  show_kappa?: string;
}>`
  padding: 10px 20px;
  border-radius: 5px;
  background: ${(props) => props.theme.nodeBg};
  color: ${(props) => props.theme.nodeColor};
  border: 1px solid
    ${(props) =>
      props.selected ? props.theme.primary : props.theme.nodeBorder};
  opacity: ${(props) => (props.kappa_required || !props.show_kappa ? 1 : 0.3)};

  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
  }
`;

export const CustomNode = memo(
  ({ id, data, selected, showKappa }: NodeProps & { showKappa: boolean }) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
      navigate(`/task/${data.traderName}`, {
        state: { taskId: id },
      });
    };

    return (
      <Node
        selected={!!selected}
        {...(data.kappaRequired ? { kappa_required: "true" } : {})}
        {...(showKappa ? { show_kappa: "true" } : {})}
        onClick={handleOnClick}
      >
        <Handle type="target" position={Position.Left} />
        <div>
          <Typography variant="h6" fontWeight={"bold"}>
            {data.taskName}
          </Typography>
          <Typography variant="subtitle2">
            Min PMC level: {data.minPlayerLevel}
          </Typography>
        </div>
        <Handle type="source" position={Position.Right} />
      </Node>
    );
  }
);
