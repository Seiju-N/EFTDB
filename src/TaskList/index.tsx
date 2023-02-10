import React, { useEffect, useState } from "react";

import {
  Box,
  Table,
  TableContainer,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import RowChild from "./RowChild";
import { Task } from "../graphql/generated";
import { parseData } from "../utils";

const fetchParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const TaskList = () => {
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
        <TableContainer sx={{ height: 550 }}>
          <Table>
            {parseData(tasks)?.map((task) => (
              <RowChild key={task.trader.id} taskData={task} />
            ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TaskList;
