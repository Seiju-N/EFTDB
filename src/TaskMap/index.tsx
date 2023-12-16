import * as React from "react";
import Tree from "react-d3-tree";
import "./style.css";
import { useHooks } from "./hooks";

export const TaskMap = () => {
  const {
    isLoading,
    taskTree,
    CustomNodeElement,
    translate,
    separation,
    getLinkClass,
  } = useHooks();

  return isLoading || !taskTree ? (
    <div>loading...</div>
  ) : (
    <div style={{ height: "80vh", width: "100vw", overflow: "hidden" }}>
      <Tree
        data={taskTree}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeElement {...rd3tProps} />
        )}
        translate={translate}
        separation={separation}
        pathClassFunc={getLinkClass}
        pathFunc="step"
        scaleExtent={{ min: 0.1, max: 1 }}
        nodeSize={{ x: 480, y: 480 }}
        zoom={0.4}
      />
    </div>
  );
};
