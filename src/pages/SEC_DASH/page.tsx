"use client";

import * as React from "react";
import EVENT_LIST from "./events_map";

const SECURITY_ADMIN_PANEL: React.FC = () => {
  return (
    <div className="container flex flex-col gap-4">
      <div className="flex justify-between mt-8">
        <div className="text-2xl font-bold">Welcome Security Admin Panel</div>
      </div>
      <EVENT_LIST />
    </div>
  );
};

export default SECURITY_ADMIN_PANEL;
