import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
    console.error("Failed to fetch users:", error);
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

type MessageContent = {
  content: string;
  time: string;
  channel: string;
};

type RowProps = {
  user: UserType;
};

const Row = ({ user }: RowProps) => {
  const [open, setOpen] = useState(false);
  const messageContents = JSON.parse(
    user.message_content || "[]"
  ) as MessageContent[];

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatDate(user.ban_date)}</TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar
              src={`https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar_hash}.png`}
              alt="User Avatar"
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">
                {user.nickname || user.display_name}
              </Typography>
              {user.nickname && (
                <Typography variant="caption" color="textSecondary">
                  {user.display_name}
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
        <TableCell>{user.user_id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Message History
              </Typography>
              <Table size="small" aria-label="messages">
                <TableHead>
                  <TableRow>
                    <TableCell width={160}>Time</TableCell>
                    <TableCell
                      width={200}
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Channel
                    </TableCell>
                    <TableCell>Content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messageContents.slice(1).map((message, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {formatDate(
                          new Date(message.time).toLocaleString("ja-JP")
                        )}
                      </TableCell>
                      <TableCell>{message.channel}</TableCell>
                      <TableCell>{message.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const UserListModal = ({ open, handleClose }: Props) => {
  const [bannedUsers, setBannedUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (open) {
      getBannedUsers().then(setBannedUsers);
    }
  }, [open]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        style: { height: 640, overflow: "hidden" },
      }}
    >
      <DialogTitle>Banned Users</DialogTitle>
      <Paper style={{ flexGrow: 1, overflow: "auto" }}>
        <Table stickyHeader aria-label="banned users table">
          <TableHead>
            <TableRow>
              <TableCell width={80} />
              <TableCell width={160}>Ban Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bannedUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <Row key={user.id} user={user} />
              ))}
          </TableBody>
        </Table>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bannedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Dialog>
  );
};
