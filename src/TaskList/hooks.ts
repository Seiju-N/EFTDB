import { useCallback, useState } from "react";

import { enUS, GridColDef, GridFilterModel, GridSortingInitialState } from "@mui/x-data-grid";

import { Task } from "@/graphql/generated";
import { SelectChangeEvent } from "@mui/material/Select";
import { gql, useQuery } from "@apollo/client";

export const useHooks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [filter, setFilter] = useState<string>("");
  const [taskFilter, setTaskFilter] = useState<GridFilterModel>({
    items: [],
  });

  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: "名",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "map",
      headerName: "マップ",
      minWidth: 120,
      flex: 0.6,
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "experience",
      headerName: "経験値",
      minWidth: 120,
      flex: 0.4,
    },
    {
      field: "trader",
      headerName: "trader name",
      minWidth: 160,
      flex: 1,
      type: "string",
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "kappaRequired",
      headerName: "Kappa",
      minWidth: 40,
      flex: 0.3,
      type: "boolean",
    },
    {
      field: "lightkeeperRequired",
      headerName: "Lightkeeper",
      minWidth: 40,
      flex: 0.3,
      type: "boolean",
    },
  ];


  const handleDialogOpen = (value: Task) => {
    setCurrentTask(value);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const defaultSort: GridSortingInitialState = {
    sortModel: [{ field: "name", sort: "asc" }],
  };

  const isAllArrayElementsEmpty = useCallback((obj: any) => {
    const { __typename, ...newObj } = obj
    return Object.values(newObj).every((val: any) => val.length === 0);
  }, []);

  const convertObject = useCallback((name: string) => {
    return {
      items: [
        { columnField: name, operatorValue: "is", value: "true" },
      ],
    };
  }, []);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value: string = event.target.value as string;
    setFilter(value);
    setTaskFilter(convertObject(value));
  };

  const GET_TASKS = gql`
    query GetTasks($lang: LanguageCode) {
      tasks(lang: $lang) {
        id
        name
        normalizedName
        experience
        minPlayerLevel
        traderLevelRequirements {
          trader {
            name
          }
          level
        }
        taskRequirements {
          task {
            name
          }
          status
        }
        kappaRequired
        lightkeeperRequired
        map {
          name
        }
        trader {
          id
          name
        }
        factionName
        objectives {
          ... on TaskObjectiveBasic {
            description
          }
          ... on TaskObjectiveBuildItem {
            attributes {
              name
            }
            containsAll {
              name
            }
            containsCategory {
              name
            }
            description
            item {
              name
            }
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveExperience {
            description
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveExtract {
            description
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveItem {
            count
            description
            dogTagLevel
            foundInRaid
            item {
              name
            }
            maps {
              name
            }
            maxDurability
            minDurability
            optional
          }
          ... on TaskObjectiveMark {
            description
            maps {
              name
            }
            markerItem {
              name
            }
            optional
          }
          ... on TaskObjectivePlayerLevel {
            description
            maps {
              name
            }
            optional
            playerLevel
          }
          ... on TaskObjectiveShoot {
            count
            description
            distance {
              compareMethod
              value
            }
          }
          ... on TaskObjectiveSkill {
            description
            maps {
              name
            }
            optional
            skillLevel {
              name
              level
            }
          }
          ... on TaskObjectiveTaskStatus {
            description
            maps {
              name
            }
            optional
            task {
              name
            }
          }
          ... on TaskObjectiveTraderLevel {
            description
            level
            maps {
              name
            }
            optional
            trader {
              name
            }
          }
        }
        startRewards {
          traderStanding {
            trader {
              name
            }
            standing
          }
          items {
            item {
              id
              name
            }
            count
            quantity
            attributes {
              type
              name
              value
            }
          }
          offerUnlock {
            trader {
              name
            }
            level
            item {
              id
              name
            }
          }
          skillLevelReward {
            name
            level
          }
          traderUnlock {
            name
          }
          craftUnlock {
            station {
              name
            }
            level
            taskUnlock {
              name
            }
          }
        }
        finishRewards {
          traderStanding {
            trader {
              name
            }
            standing
          }
          items {
            item {
              id
              name
            }
            count
            quantity
            attributes {
              type
              name
              value
            }
          }
          offerUnlock {
            trader {
              name
            }
            level
            item {
              id
              name
            }
          }
          skillLevelReward {
            name
            level
          }
          traderUnlock {
            name
          }
        }
      }
    }
  `;

  const { data: taskData, loading } = useQuery(GET_TASKS, {
    variables: { lang: "en" },
  });

  return {
    handleDialogOpen,
    handleDialogClose,
    handleChange,
    isAllArrayElementsEmpty,
    setCurrentTask,
    dialogOpen,
    currentTask,
    filter,
    taskFilter,
    cols,
    defaultSort,
    taskData,
    loading
  };
};
