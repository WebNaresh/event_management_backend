import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const checkPointSchema = z.object({
  name: z.string().min(1, "Check point name is required"),
});
interface Props {
  eventId: string;
}

export default function CheckPointForm({ eventId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof checkPointSchema>>({
    resolver: zodResolver(checkPointSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof checkPointSchema>) => {
      const response = await axios.post(
        `/event/${eventId}/checkpoints`,
        values
      );
      return response.data;
    },
    onSettled: async () => {
      await queryClient?.invalidateQueries({
        queryKey: ["event", eventId],
      });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof checkPointSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Check Points</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Check Point</DialogTitle>
          <DialogDescription>
            Enter the name for the new check point.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Point Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter check point name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Add Check Point
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
