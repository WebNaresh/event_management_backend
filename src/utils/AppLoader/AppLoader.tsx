import ReportIcon from "@mui/icons-material/Report";
import { Backdrop, CircularProgress } from "@mui/material";
import useAppState from "../../hooks/useAppState";

const AppLoader = () => {
  const { appLoading } = useAppState();
  return (
    <>
      {appLoading.load ? (
        <Backdrop
          sx={{
            color: appLoading.color,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={appLoading.load}
        >
          <CircularProgress color={"inherit"} />
          {appLoading.color === "danger" ? <ReportIcon /> : null}
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default AppLoader;
