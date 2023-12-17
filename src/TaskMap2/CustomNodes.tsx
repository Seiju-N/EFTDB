import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";

const Node = styled.div<{ selected: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  background: ${(props) => props.theme.nodeBg};
  color: ${(props) => props.theme.nodeColor};
  border: 1px solid
    ${(props) =>
      props.selected ? props.theme.primary : props.theme.nodeBorder};

  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
  }
`;

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  return (
    <Node selected={!!selected}>
      <Handle type="target" position={Position.Left} />
      <div>
        <strong>{data.label}</strong>
      </div>
      <Handle type="source" position={Position.Right} />
    </Node>
  );
});
