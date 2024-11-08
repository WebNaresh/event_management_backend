import useAppState from "@/hooks/useAppState";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SyntheticEvent } from "react";

export default function AppAlert() {
  const { appAlert, setAppAlert } = useAppState();

  const handleClose = (_event: SyntheticEvent | Event) => {
    setAppAlert({
      ...appAlert,
      alert: false,
    });
  };
  return (
    <>
      <Snackbar
        open={appAlert.alert}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={appAlert.type}
          sx={{ width: "100%" }}
        >
          {appAlert.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
