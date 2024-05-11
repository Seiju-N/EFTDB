import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type UserType = {
  id: string;
  display_name: string;
  nickname?: string;
  channel_name: string;
  user_id: string;
  avatar_hash: string;
  ban_date: string;
  reason?: string;
  channel_id: string;
  message_content?: string;
  is_unbanned: boolean;
};

const getBannedUsers = async (): Promise<UserType[]> => {
  try {
    const response = await fetch(
      "https://hsf9unug85.execute-api.ap-northeast-1.amazonaws.com/default/get_banned_user_list",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ユーザーの取得中にエラーが発生しました:", error);
    return [];
  }
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const columns: GridColDef[] = [
  {
    field: "ban_date",
    headerName: "Ban Date",
    width: 150,
    valueFormatter: (params) => formatDate(params.value as string),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="subtitle2">
        {formatDate(params.row.ban_date)}
      </Typography>
    ),
  },
  {
    field: "display_name",
    headerName: "Name",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Avatar
          src={`https://cdn.discordapp.com/avatars/${params.row.user_id}/${params.row.avatar_hash}.png`}
          alt="User Avatar"
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">
            {params.row.nickname || params.row.display_name}
          </Typography>
          {params.row.nickname ? (
            <Typography variant="caption" color="textSecondary">
              {params.row.display_name}
            </Typography>
          ) : null}
        </Box>
      </>
    ),
  },
  {
    field: "user_id",
    headerName: "Discord User ID",
    width: 160,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="subtitle2">{params.row.user_id}</Typography>
    ),
  },
  {
    field: "channel_name",
    headerName: "Channel",
    width: 160,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="subtitle2">{params.row.channel_name}</Typography>
    ),
  },
  {
    field: "message_content",
    headerName: "Message Content",
    width: 240,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="subtitle2">{params.row.message_content}</Typography>
    ),
  },
];

export const UserListModal = ({ open, handleClose }: Props) => {
  const [bannedUsers, setBannedUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (open) {
      getBannedUsers().then((users) => {
        setBannedUsers(users);
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Banned Users</DialogTitle>
      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableSelectionOnClick
          rows={bannedUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: "ban_date",
                  sort: "desc",
                },
              ],
            },
          }}
          components={{
            NoRowsOverlay: () => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="h6">No banned users</Typography>
              </Box>
            ),
          }}
        />
      </Paper>
    </Dialog>
  );
};
