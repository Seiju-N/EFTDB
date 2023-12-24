import React, { useState } from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";
import { grey, lightBlue } from "@mui/material/colors";

export const CustomEdge = (props: EdgeProps) => {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
  } = props;

  const [isClicked, setIsClicked] = useState(false);

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const customStyle = {
    stroke: isClicked ? lightBlue[300] : grey[100],
    strokeWidth: 3,
  };

  return (
    <g onClick={handleClick}>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={customStyle} />
    </g>
  );
};
