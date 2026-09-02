import { SyntheticEvent, useCallback, useState } from "react";

import { Box, Dialog, DialogTitle, Tab, Tabs } from "@mui/material";

import { TabPanel } from "@/components/TabPanel";
import { FinishRewards } from "./parts/FinishRewards";
import { StartRewards } from "./parts/StartRewards";
import { Requirements } from "./parts/Requirements";
import { TaskObjectives } from "./parts/TaskObjectives";
import { Category, Task } from "@/api/types";
import { LanguageCode, Maybe } from "@/graphql/generated";
import { dictType } from "@/constants/languages/types";

type Props = {
  currentTask: Task | undefined;
  dialogOpen: boolean;
  handleDialogClose: () => void;
  categories: readonly Maybe<Category>[] | undefined;
  langDict: dictType;
  lang: LanguageCode;
  // When provided (e.g. from TaskMap), required-task links switch this
  // dialog to that task in place instead of navigating to the Task List page.
  onTaskSelect?: (taskId: string) => void;
};

export const TaskDetailDialog = ({
  currentTask,
  dialogOpen,
  handleDialogClose,
  categories,
  langDict,
  lang,
  onTaskSelect,
}: Props) => {
  const [value, setValue] = useState(0);
  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  if (!currentTask) return null;

  return (
    <Dialog
      scroll="paper"
      open={dialogOpen}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="md"
      sx={{
        minHeight: "70vh",
      }}
      aria-label="task dialog"
    >
      <DialogTitle
        sx={{
          height: 100,
          fontSize: "2.4rem",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${currentTask.taskImageLink}')`,
            backgroundPosition: "center",
            opacity: 0.4,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <Box
          sx={{
            position: "relative",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {currentTask?.name}
        </Box>
      </DialogTitle>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }} component="div">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={langDict.TASK_DETAIL_DIALOG.Objective} />
          <Tab label={langDict.TASK_DETAIL_DIALOG.Requirements} />
          <Tab label={langDict.TASK_DETAIL_DIALOG.StartRewards} />
          <Tab label={langDict.TASK_DETAIL_DIALOG.FinishRewards} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TaskObjectives
          currentTask={currentTask}
          langDict={langDict}
          categories={categories}
          lang={lang}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Requirements
          currentTask={currentTask}
          langDict={langDict}
          onTaskSelect={onTaskSelect}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StartRewards
          currentTask={currentTask}
          langDict={langDict}
          categories={categories}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FinishRewards
          currentTask={currentTask}
          langDict={langDict}
          categories={categories}
        />
      </TabPanel>
    </Dialog>
  );
};
