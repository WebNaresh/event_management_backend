"use client";

import { toast } from "@/hooks/use-toast";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import DashboardDialog from "./_components/event_dilog";
import EVENT_LIST from "./_components/events_map";
import AddSecurityPersonModal from "./_components/security_dilog";

const SA_DASH: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = React.useState(false);
  const { token, getDecodeToken } = useAuthToken();
  const queryClient = useQueryClient();

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
      await queryClient?.invalidateQueries({
        queryKey: ["events"],
      });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the event.",
      });
    }
  }
  async function handleSecurityFormSubmit(values: any) {
    try {
      // const userId = getDecodeToken()?.id;
      const response = await axios.post(
        "/security",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Security Person Added",
        description: "Name: " + response.data.name,
      });
      setIsSecurityModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the security person.",
      });
    }
  }

  return (
    <div className="container flex flex-col gap-4">
      <div className="flex justify-between mt-8">
        <div className="text-2xl font-bold">Welcome Super Admin</div>
        <div className="flex gap-4">
          <DashboardDialog
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleFormSubmit={handleFormSubmit}
          />
          <AddSecurityPersonModal
            isModalOpen={isSecurityModalOpen}
            setIsModalOpen={setIsSecurityModalOpen}
            handleFormSubmit={handleSecurityFormSubmit}
          />
        </div>
      </div>
      <EVENT_LIST />
    </div>
  );
};

export default SA_DASH;
