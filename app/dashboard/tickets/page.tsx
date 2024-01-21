import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Paragraph } from "@/app/components";
import Actionbar from "@/app/components/feature/Actionbar";
import Actions from "@/app/components/feature/Actions";
import TicketActions from "@/app/components/feature/TicketActions";
import Table from "@/app/components/ui/Table";
import { api } from "@/services/endpoints";
import { getStudentTickets } from "@/services/getData";
import { getServerSession } from "next-auth";


const Tickets = async () => {
  
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;
  
  const studentTickets = await getStudentTickets(
    `${api.studentTickets}/${userId}`
    );
  
    const response = await fetch(
    "https://65a95f44219bfa371869216b.mockapi.io/api/v1/tickets",
    {
      cache: "no-store",
      next:{
        revalidate: 0
      }
    } );
    
    const data = await response.json();
  console.log(data)

  return (
    <div>
      <div className="flex justify-between items-center">
        <Actionbar />
        
      </div>
      <Table
        data={studentTickets?.studentTickets || []}
        visibleColumns={["ticketName", "reason", "ticketDate", "ticketStatus"]}
        actions={
          <TicketActions/>
        }
      />
    </div>
  );
};

export default Tickets;
