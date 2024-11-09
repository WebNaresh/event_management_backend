import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventAddForm from "./security_form";

interface DashboardDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleFormSubmit: (values: any) => void;
}

const AddSecurityPersonModal: React.FC<DashboardDialogProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleFormSubmit,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Add Security Person</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Security Person</DialogTitle>
          <DialogDescription>
            Fill in the details for the new security person. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <EventAddForm onSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSecurityPersonModal;
