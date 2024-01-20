import { addPerson } from "@/actions/people.server";
import { Button, Input } from "@/app/components";

const AddTicketForm =() => {  

  return (
    <form 
    action={addPerson}
    >
      <Input
        name="ticketName"
        className="w-full mb-4"
        placeholder="Enter ticket name"
      />
      <Input
        name="ticketItem"
        className="w-full mb-4"
        placeholder="Enter your title"
      />
      <Input
        name="reason"
        className="w-full mb-4 h-20 flex items-start justify-start"
        placeholder="Enter your reason"
      />
      <Button title="Save" type="submit" />
    </form>
  );
};

export default AddTicketForm;
