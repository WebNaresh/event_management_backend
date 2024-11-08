import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Event } from "../page";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span className="text-lg">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-primary" />
            <span className="text-lg">{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
