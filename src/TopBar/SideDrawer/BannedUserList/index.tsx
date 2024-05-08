import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  bannedUsers: { id: string; username: string }[];
};

export const UserListModal = ({ open, handleClose, bannedUsers }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Banded Users</DialogTitle>
      <List>
        {bannedUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
