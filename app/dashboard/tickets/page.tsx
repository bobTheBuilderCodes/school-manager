import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Actionbar from "@/app/components/feature/Actionbar";
import Table from "@/app/components/ui/Table";
import { api } from "@/services/endpoints";
import { getStudentTickets } from "@/services/getData";
import { getCellStyle } from "@/utils/getCellStyle";
import { getServerSession } from "next-auth";




const Tickets = async ({searchParams}: {
  searchParams: {
    name: string,
    status: string
  }
}) => {





  
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;
  const status = ''
  const pageNumber = 1
  const pageSize = 10
  
  const studentTickets = await getStudentTickets(
    // `${api.studentTickets}/${userId}?page=${pageNumber}&size=${pageSize}&status=${status}&name=`
    searchParams
    );

    console.log("Tickets", studentTickets?.studentTickets)

  
  return (
    <div>
      <div className="flex justify-between items-center">
      <Actionbar/> 
      </div>
      <Table content="" getCellStyle={getCellStyle}
        data={studentTickets?.studentTickets || []}
        visibleColumns={["name", "reason", "date", "status"]}
      />
    </div>
  );
};

export default Tickets;
