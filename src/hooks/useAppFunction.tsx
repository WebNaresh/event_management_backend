import { AlertColor, AppLoading } from "./types";
import useAppState from "./useAppState";

export const useAppFunction = () => {
  const { setAppAlert, setAppLoading } = useAppState();

  const handleAlert = (alert: boolean, type: AlertColor, msg: string) => {
    setAppAlert({
      alert: alert || false,
      type: type || "success",
      msg: msg || "this is test message",
    });
  };

  const handleLoader = ({ load = true, color = "#fff" }: AppLoading) => {
    setAppLoading({
      load,
      color,
    });
    setTimeout(() => {
      setAppLoading({
        load: false,
        color,
      });
    }, 2000);
  };

  return { handleAlert, handleLoader };
};

export default useAppFunction;
