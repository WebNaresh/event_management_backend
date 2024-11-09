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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import * as z from "zod";

const securityPersonSchema = z.object({
  securityPersonIds: z
    .array(z.string())
    .min(1, "At least one security person is required"),
});

interface SecurityPerson {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  role: string;
}

interface Props {
  eventId: string;
}

export default function SecurityAssignmentForm({ eventId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { event_id } = useParams();

  console.log(`🚀 ~ file: security_form.tsx:52 ~ event_id:`, event_id);

  const form = useForm<z.infer<typeof securityPersonSchema>>({
    resolver: zodResolver(securityPersonSchema),
    defaultValues: {
      securityPersonIds: [],
    },
  });
  console.log(`🚀 ~ file: security_form.tsx:60 ~ form:`, form.formState.errors);

  const { data: securityPersons } = useQuery({
    queryKey: ["securityPersons", event_id],
    queryFn: async () => {
      const response = await axios.get(`/security/${event_id}`);
      return response.data as SecurityPerson[];
    },
  });
  console.log(
    `🚀 ~ file: security_form.tsx:61 ~ securityPersons:`,
    securityPersons
  );
  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof securityPersonSchema>) => {
      const response = await axios.post("/security/assign", {
        event_id: eventId,
        user_ids: values.securityPersonIds,
      });
      return response.data;
    },
    onSettled: async () => {
      await queryClient?.invalidateQueries({
        queryKey: ["event", eventId],
      });
      await queryClient?.invalidateQueries({
        queryKey: ["securityPersons", eventId],
      });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof securityPersonSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Select Security Person</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Security Person</DialogTitle>
          <DialogDescription>
            Choose security persons for this event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="securityPersonIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Persons</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      isMulti
                      options={
                        securityPersons?.map((person: SecurityPerson) => ({
                          value: person.id,
                          label: `${person.first_name} ${person.last_name}`,
                        })) as any
                      }
                      className="input"
                      onChange={(selectedOptions) => {
                        field.onChange(
                          selectedOptions.map((option: any) => option.value)
                        );
                      }}
                      value={securityPersons
                        ?.filter((person: SecurityPerson) =>
                          field.value.includes(person.id)
                        )
                        .map((person: SecurityPerson) => ({
                          value: person.id,
                          label: `${person.first_name} ${person.last_name}`,
                        }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Assign Security Persons
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
