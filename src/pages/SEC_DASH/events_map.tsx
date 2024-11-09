"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

interface EventsResponse {
  message: string;
  data: Event[];
}

const fetchEvents = async (): Promise<EventsResponse> => {
  const response = await axios.get("/event", {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};

export default function EVENT_LIST() {
  const { data, error, isLoading } = useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: deleteEvent,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["events"],
  //     });
  //   },
  // });

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
      {data?.data.map((event) => (
        <Card key={event.id} className="w-[300px] h-[300px]">
          <Link to={`/security/dashboard/${event.id}`} key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
          </Link>
          <CardContent>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
