import {
  alpha,
  Box,
  Checkbox,
  Link,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { LanguageDictContext } from "@/App";
import { useTaskMap } from "@/contexts/TaskMapContext";

const Node = styled.div<{ $kappaRequired?: string }>`
  padding: 10px 20px;
  border-radius: 5px;
  background: ${(props) => props.theme.nodeBg};
  color: ${(props) => props.theme.nodeColor};
  border: 1px solid ${(props) => props.theme.nodeBorder};
  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
  }
`;

type TitleProps = {
  taskName: string;
  data: NodeProps["data"];
  id: string;
};
const Title = memo(({ taskName, data, id }: TitleProps) => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate(`/task/${data.traderName}`, {
      state: { taskId: id },
    });
  }, [navigate, data.traderName, id]);
  return (
    <Link
      component={"button"}
      variant="h4"
      fontWeight={"bold"}
      underline="hover"
      color={"inherit"}
      onClick={handleOnClick}
    >
      {taskName}
    </Link>
  );
});

type MinLevelProps = {
  minLevel: string | number;
};
const MinLevel = memo(({ minLevel }: MinLevelProps) => {
  const langDict = useContext(LanguageDictContext);
  return (
    <Typography variant="body1">
      {langDict.TASKMAP.minLevel}: {minLevel}
    </Typography>
  );
});

type CheckBoxWrapperProps = {
  isNodeChecked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxWrapper = memo(
  ({ isNodeChecked, handleCheckboxChange }: CheckBoxWrapperProps) => {
    const langDict = useContext(LanguageDictContext);
    const { isPending } = useTaskMap();
    return (
      <Box sx={{ pl: 1 }}>
        <Tooltip title={langDict.TASKMAP.tooltip}>
          <Checkbox
            checked={isNodeChecked}
            onChange={handleCheckboxChange}
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircleOutline />}
            disabled={isPending}
            color="success"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 36 }, p: 0 }}
          />
        </Tooltip>
      </Box>
    );
  }
);

export const CustomNode = memo(({ id, data }: NodeProps) => {
  const theme = useTheme();
  const { updateNodeAndParents } = useTaskMap();
  const successColor = alpha(theme.palette.success.main, 0.8);
  const [isNodeChecked, setIsNodeChecked] = useState<boolean>(
    data.isNodeChecked || false
  );
  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const newChecked = event.target.checked;
      setIsNodeChecked(newChecked);
      updateNodeAndParents(id, newChecked);
    },
    [id, updateNodeAndParents]
  );

  const nodeStyle = {
    backgroundColor: isNodeChecked ? successColor : alpha("#000", 0.8),
  };

  useEffect(() => {
    setIsNodeChecked(data.isNodeChecked || false);
  }, [data.isNodeChecked]);

  return (
    <Node
      $kappaRequired={data.kappaRequired ? "true" : undefined}
      style={nodeStyle}
    >
      <Title taskName={data.taskName} data={data} id={id} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MinLevel minLevel={data.minPlayerLevel} />
        <CheckBoxWrapper {...{ isNodeChecked, handleCheckboxChange }} />
      </Box>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Node>
  );
});
