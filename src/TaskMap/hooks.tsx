import * as React from "react";
import { TreeLinkDatum } from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types";
import { common, grey } from "@mui/material/colors";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHooks = () => {
  type TreeChartProps = {
    nodeDatum: RawNodeDatum;
  };

  const defaultData: RawNodeDatum = {
    name: "Root",
    children: [
      {
        name: "Grenadier",
        attributes: {
          id: "5c0d190cd09282029f5390d8",
          kappaRequired: true,
          minPlayerLevel: "20",
          trader: "Prapor",
        },
        children: [
          {
            name: "Test Drive - Part 1",
            attributes: {
              id: "5c0bd94186f7747a727f09b2",
              kappaRequired: true,
              minPlayerLevel: "30",
              trader: "Prapor",
            },
            children: [
              {
                name: "Collector",
                attributes: {
                  id: "5c51aac186f77432ea65c552",
                  kappaRequired: true,
                  minPlayerLevel: "48",
                  trader: "Fence",
                },
                children: [],
              },
              {
                name: "Test Drive - Part 2",
                attributes: {
                  id: "63a5cf262964a7488f5243ce",
                  kappaRequired: false,
                  minPlayerLevel: "30",
                  trader: "Prapor",
                },
                children: [
                  {
                    name: "Test Drive - Part 3",
                    attributes: {
                      id: "64f5deac39e45b527a7c4232",
                      kappaRequired: false,
                      minPlayerLevel: "30",
                      trader: "Prapor",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [taskTree, setTaskTree] = useState<RawNodeDatum>(defaultData);
  const navigate = useNavigate();

  const handleClick = (nodeDatum: RawNodeDatum) => {
    navigate(`/task/${nodeDatum.attributes?.trader}`, {
      state: { taskId: nodeDatum.attributes?.id },
    });
  };
  const translate = { x: 200, y: 300 };
  const separation = { siblings: 0.2, nonSiblings: 0.3 };
  const getLinkClass = (linkDatum: TreeLinkDatum) => {
    if (linkDatum.source.data.name === "Root") {
      return "hidden-link";
    }
    return linkDatum.target.children ? "branch-link" : "leaf-link";
  };
  const CustomNodeElement: React.FC<TreeChartProps> = ({ nodeDatum }) => {
    if (nodeDatum.name === "Root") {
      return null;
    }
    return (
      <g onClick={() => handleClick(nodeDatum)}>
        <rect
          x="-120"
          y="-40"
          rx="5"
          ry="5"
          style={{
            width: "320",
            height: "80",
            fill: grey[900],
            stroke: grey[400],
            strokeWidth: "2",
          }}
        />
        <text
          x="-100"
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
          x="-100"
          y="20"
          style={{
            fill: grey[300],
            strokeWidth: "0",
            fontSize: "0.9em",
            maxWidth: "280",
          }}
        >
          {`Lv${nodeDatum.attributes?.minPlayerLevel}以上`}
        </text>
      </g>
    );
  };

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
            const virtualRoot: RawNodeDatum = {
              name: "Root",
              children: data,
            };
            setTaskTree(virtualRoot);
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

  return {
    isLoading,
    taskTree,
    handleClick,
    translate,
    separation,
    getLinkClass,
    CustomNodeElement,
  };
};
