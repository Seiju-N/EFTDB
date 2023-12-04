import React, { createContext, useContext, useState } from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

type ShowSnackBarProps = {
  message: string;
  severity?: AlertProps["severity"];
};

type SnackBarContextType = {
  showSnackBar: ({ message, severity }: ShowSnackBarProps) => void;
};

type SnackBarProviderProps = {
  children: React.ReactNode;
};

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};

export const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    severity: "success" as AlertProps["severity"],
    message: "",
  });

  const showSnackBar = ({
    message,
    severity = "success",
  }: ShowSnackBarProps) => {
    setSnackBarInfo({ open: true, message, severity });
    setTimeout(() => {
      setSnackBarInfo({ open: false, message: "", severity: "success" });
    }, 4000);
  };

  const handleCloseSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "success" });
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <Snackbar
        open={snackBarInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackBarInfo.severity}
          sx={{ width: "100%" }}
        >
          {snackBarInfo.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
