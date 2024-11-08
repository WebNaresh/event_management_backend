export type AlertColor = "error" | "warning" | "info" | "success";

export interface AppAlert {
  alert: boolean;
  type: AlertColor;
  msg: string;
}

export interface AppLoading {
  load: boolean;
  color: string;
}
