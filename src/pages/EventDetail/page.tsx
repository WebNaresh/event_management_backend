import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckPointForm from "./_components/check_point_form";
import EventCard from "./_components/event_card";
import SecurityAssignmentForm from "./_components/security_form";

interface CheckPoint {
  id: string;
  name: string;
  eventId: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  role: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
  checkPoints: CheckPoint[];
  user: User;
}

const fetchEvent = async (id: string): Promise<Event> => {
  const response = await axios.get(`/event/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data.data;
};

export default function EventDetail() {
  const params = useParams<{ event_id: string }>();
  const eventId = params.event_id as string;

  const {
    data: event,
    error,
    isLoading,
  } = useQuery<Event>({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the event details. Please try again
            later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto mt-8">
        <Alert>
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested event could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 gap-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Detail</h2>
        <div className="flex gap-4">
          <CheckPointForm eventId={event.id} />
          <SecurityAssignmentForm eventId={event.id} />
        </div>
      </div>
      <EventCard event={event} />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Checkpoints</h3>
        <ul className="list-disc list-inside">
          {event.checkPoints.map((checkpoint, index) => (
            <li key={index}>{checkpoint.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
