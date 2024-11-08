"use client";

import { toast } from "@/hooks/use-toast";
import { useAuthToken } from "@/hooks/useAuthToken";
import axios from "axios";
import * as React from "react";
import DashboardDialog from "./_components/dashboard_dilog";
import EVENT_LIST from "./_components/events_map";

const SA_DASH: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { token, getDecodeToken } = useAuthToken();

  async function handleFormSubmit(values: any) {
    try {
      console.log("values", getDecodeToken());
      const userId = getDecodeToken()?.id;
      const response = await axios.post(
        "/event",
        {
          ...values,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Event Added",
        description: "Title: " + response.data.title,
      });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the event.",
      });
    }
  }

  return (
    <div className="container flex flex-col gap-4">
      <div className="flex justify-between mt-8">
        <div className="text-2xl font-bold">Welcome Super Admin</div>
        <div>
          <DashboardDialog
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <EVENT_LIST />
    </div>
  );
};

export default SA_DASH;
