"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import CHECKPOINT_LIST from "./checkpoints_map";

const CheckPoints: React.FC = () => {
  const params = useParams<{ event_id: string }>();
  return (
    <div className="container flex flex-col gap-4">
      <div className="flex justify-between mt-8">
        <div className="text-2xl font-bold">Welcome Check Points</div>
      </div>
      <CHECKPOINT_LIST eventId={params?.event_id} />
    </div>
  );
};

export default CheckPoints;
