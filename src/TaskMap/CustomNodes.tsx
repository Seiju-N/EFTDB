import { Box, Checkbox, Link, Tooltip, Typography } from "@mui/material";
import React, { memo, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { LanguageDictContext } from "@/App";

const Node = styled.div<{
  selected: boolean;
  kappa_required?: string;
}>`
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

export const CustomNode = memo(({ id, data, selected }: NodeProps) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(() => {
    const savedNodes = JSON.parse(localStorage.getItem("checkedNodes") || "{}");
    return savedNodes[id] || false;
  });
  const langDict = useContext(LanguageDictContext);

  const updateLocalStorage = useCallback(
    (checked: boolean) => {
      const savedNodes = JSON.parse(
        localStorage.getItem("checkedNodes") || "{}"
      );
      if (checked) {
        savedNodes[id] = true;
      } else {
        delete savedNodes[id];
      }
      localStorage.setItem("checkedNodes", JSON.stringify(savedNodes));
    },
    [id]
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const newChecked = event.target.checked;
      setIsChecked(newChecked);
      updateLocalStorage(newChecked);
    },
    [updateLocalStorage]
  );

  const handleOnClick = useCallback(() => {
    navigate(`/task/${data.traderName}`, {
      state: { taskId: id },
    });
  }, [navigate, data.traderName, id]);

  return (
    <Node
      selected={!!selected}
      {...(data.kappaRequired ? { kappa_required: "true" } : {})}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Link
        component={"button"}
        variant="h5"
        fontWeight={"bold"}
        underline="hover"
        color={"inherit"}
        onClick={handleOnClick}
      >
        {data.taskName}
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2">
          {langDict.TASKMAP.minLevel}: {data.minPlayerLevel}
        </Typography>
        <Tooltip title={langDict.TASKMAP.tooltip}>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircle />}
            color="success"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 32 }, p: 0, pl: 1 }}
          />
        </Tooltip>
      </Box>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Node>
  );
});
