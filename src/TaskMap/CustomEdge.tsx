import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

export const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  showKappaRequired,
  markerEnd,
}: EdgeProps & { showKappaRequired: boolean }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const edgeOpacity = showKappaRequired ? 0.3 : 1;
  const customStyle = { ...style, opacity: edgeOpacity };

  return <BaseEdge path={edgePath} markerEnd={markerEnd} style={customStyle} />;
};
