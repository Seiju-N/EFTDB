import * as React from "react";
import Tree, { TreeLinkDatum } from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types";
import { common, grey } from "@mui/material/colors";
import "./style.css";
import { useEffect, useState } from "react";
type TreeChartProps = {
  nodeDatum: RawNodeDatum;
};
const translate = { x: 200, y: 200 };
const separation = { siblings: 1, nonSiblings: 2 };
const CustomNodeElement: React.FC<TreeChartProps> = ({ nodeDatum }) => {
  return (
    <g>
      <rect
        x="-75"
        y="-40"
        rx="5"
        ry="5"
        style={{
          width: "150",
          height: "80",
          fill: grey[900],
          stroke: grey[400],
          strokeWidth: "2",
        }}
      />
      <text
        x="-60"
        style={{
          fill: common.white,
          strokeWidth: "0",
          fontWeight: "bold",
          fontSize: "1.4em",
          maxWidth: "280",
        }}
      >
        {nodeDatum.name}
      </text>
      <text
        x="-60"
        y="20"
        style={{
          fill: grey[300],
          strokeWidth: "0",
          fontSize: "0.9em",
          maxWidth: "280",
        }}
      >
        {`年齢：${nodeDatum.attributes?.age}`}
      </text>
    </g>
  );
};

const getLinkClass = (linkDatum: TreeLinkDatum) => {
  return linkDatum.target.children ? "branch-link" : "leaf-link";
};

const defaultData: RawNodeDatum = {
  name: "データがありません。",
  children: [],
};

export const TaskMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [taskTree, setTaskTree] = useState<RawNodeDatum>(defaultData);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_get_task_tree",
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
          const data = await response.json();
          console.log(data);
          if (data) {
            setTaskTree(data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
        nodeSize={{ x: 200, y: 200 }}
      />
    </div>
  );
};