import React, { useEffect, useState } from "react";

import {
  Box,
  Backdrop,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from "@mui/material";

import { Task } from "../graphql/generated";
import { parseData } from "../utils";
import { DataGrid } from "@mui/x-data-grid";
import { useHooks } from "./hooks";

const fetchParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const TaskList = () => {
  const {
    handleDialogOpen,
    handleTradersFilter,
    filter,
    tradersFilter,
    cols,
    localeText,
    defaultSort,
  } = useHooks();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            tasks(lang:ja){
              id
              name
              normalizedName
              experience
              minPlayerLevel
              traderLevelRequirements{
                trader{
                  name
                }
                level
              }
              taskRequirements{
                task{
                  name
                }
                status
              }
              map{
                name
              }
              trader{
                id
                name
              }
              factionName
              objectives{
                id
                type
                description
                optional
                maps{
                  name
                }
              }
              startRewards{
                traderStanding{
                  trader{
                    name
                  }
                  standing
                }
                items{
                  item{
                    id
                    name
                  }
                  count
                  quantity
                  attributes{
                    type
                    name
                    value
                  }
                }
                offerUnlock{
                  trader{
                    name
                  }
                  level
                  item{
                    id
                    name
                  }
                }
                skillLevelReward{
                  name
                  level
                }
                traderUnlock{
                  name
                }
                craftUnlock{
                  station{
                    name
                  }
                  level
                  taskUnlock{
                    name
                  }
                }
              }
              finishRewards{
                traderStanding{
                  trader{
                    name
                  }
                  standing
                }
                items{
                  item{
                    id
                    name
                  }
                  count
                  quantity
                  attributes{
                    type
                    name
                    value
                  }
                }
                offerUnlock{
                  trader{
                    name
                  }
                  level
                  item{
                    id
                    name
                  }
                }
                skillLevelReward{
                  name
                  level
                }
                traderUnlock{
                  name
                }
              }
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setTasks(data.tasks);
        });
    };
    access_api();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={tasks.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Container sx={{ height: "100%" }}>
          <ToggleButtonGroup
            size="small"
            value={filter}
            onChange={handleTradersFilter}
            aria-label="text formatting"
            exclusive
          >
            {parseData(tasks)?.map((task) => (
              <ToggleButton
                key={task.trader.name}
                value={task.trader.name}
                aria-label={task.trader.name}
              >
                {task.trader.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Box height={"88vh"}>
            <DataGrid
              columns={cols}
              rows={tasks}
              sx={{ cursor: "pointer" }}
              density="compact"
              localeText={localeText}
              initialState={{
                columns: {
                  columnVisibilityModel: { experience: false, trader: false },
                },
                sorting: defaultSort,
              }}
              filterModel={tradersFilter}
              onCellClick={(event: any) => handleDialogOpen(event.row)}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TaskList;
