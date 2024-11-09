import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventAddForm from "./event_add_form";

interface DashboardDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleFormSubmit: (values: any) => void;
}

const DashboardDialog: React.FC<DashboardDialogProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleFormSubmit,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill in the details for the new event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EventAddForm onSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDialog;
