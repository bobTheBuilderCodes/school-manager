import Actionbar from "@/app/components/feature/Actionbar";
import Pagination from "@/app/components/feature/Pagination";
import Table from "@/app/components/ui/Table";
import { getStudentTickets } from "@/services/getData";
import { getCellStyle } from "@/utils/getCellStyle";


const Tickets = async ({
  searchParams,
}: {
  searchParams: {
    name: string;
    status: string;
    page: string
  };
}) => {
  const studentTickets = await getStudentTickets(searchParams);

  console.log("Tickets", studentTickets?.studentTickets);

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* <Actionbar /> */}
        <h1>We will be back</h1>
      </div>
      {/* <Table
        content=""
        getCellStyle={getCellStyle}
        data={studentTickets?.studentTickets || []}
        visibleColumns={["name", "reason", "date", "status"]}
      /> */}
    </div>
  );
};

export default Tickets;
