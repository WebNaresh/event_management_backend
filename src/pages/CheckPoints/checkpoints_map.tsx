"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

interface CheckPoint {
  id: string;
  name: string;
  eventId: string;
}

interface EventsResponse {
  message: string;
  data: CheckPoint[];
}

const fetchEvents = async (eventId: string): Promise<EventsResponse> => {
  const response = await axios.get(`/event/${eventId}/checkpoints`, {
    headers: {
      accept: "*/*",
    },
  });
  return response.data;
};

type Props = {
  eventId: string | undefined;
};

export default function CHECKPOINT_LIST({ eventId }: Props) {
  const { data, error, isLoading } = useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: () => fetchEvents(eventId as string),
    enabled: !!eventId,
  });
  console.log(`🚀 ~ file: checkpoints_map.tsx:46 ~ data:`, data);

  if (isLoading) {
    return (
      <div className="">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-[300px] h-[300px]">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the events. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {data?.data.map((checkpoint) => (
        <Card key={checkpoint.id} className="w-[300px] h-auto">
          <Link
            to={`/security/dashboard/${eventId}/checkpoint/${checkpoint.id}`}
            key={checkpoint.id}
          >
            <CardHeader>
              <CardTitle>{checkpoint.name}</CardTitle>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  );
}
