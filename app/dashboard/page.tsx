import { getServerSession } from "next-auth";
import { Card, Heading, Paragraph } from "../components";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getNotifications } from "@/services/getData";
import SubHeading from "../components/ui/SubHeading";
import TicketAction from "../components/feature/TicketAction";
import { getData } from "@/services/getData";
import { StudentDetails } from "@/types/StudentProps";

const DashboardHome = async () => {
  const session = await getServerSession(authOptions);

  const loggedInUser = session?.user.loggedInUser;
  const userRole = session?.user.userRole;

  // const students = await getData(); 
  // const allNotifications: notification[] = await getNotifications();

  const [allNotifications, allStudents] = await Promise.all([getNotifications(), getData()]);

  const announcements = new Array(9).fill({
    content: "This is an announcement",
    time: "Today, 2pm",
  });

  return (

    <main className="flex flex-wrap md:flex-nowrap">

      <section className="w-full md:w-2/3 p-4">
        <Heading title={`Good morning ${loggedInUser} 🚀`} className="mb-1 text-4xl"/>
        <Paragraph title={'You look so good today. Shine like a beacon'} className="mb-12" />
        {/* Admin stats */}
        {userRole === "admin" && (
          <div className="flex flex-wrap justify-between my-6">
            <Card className="w-full md:w-[30%] p-3 cardGradient">
              <Paragraph title={"Total students"} className="text-white" />
              <Heading title={allStudents?.length} className="text-4xl" />
            </Card>
            <Card className="w-full md:w-[30%] p-3 mx-0 md:mx-3 my-3 md:my-0 cardGradient">
              <Paragraph title={"Total teachers"} className="text-white" />
              <Heading title="50" className="text-4xl" />
            </Card>
            <Card className="w-full md:w-[30%] p-3 cardGradient">
              <Paragraph title={"Total parents"} className="text-white" />
              <Heading title="120" className="text-4xl" />
            </Card>
          </div>
        )}
        {/* Student data */}
        {userRole === "student" && (
          <div className="flex flex-wrap justify-between">
            <Card className="w-full md:w-1/3 p-3 cardGradient">
              <Paragraph title={"My competitions"} className="text-white" />
              <Heading title="520" className="text-4xl" />
            </Card>
            <Card className="w-full md:w-1/3 p-3 mx-0 md:mx-3 my-3 md:my-0 cardGradient">
              <Paragraph title={"Highest Score"} className="text-white" />
              <Heading title="88%" className="text-4xl" />
            </Card>
            <Card className="w-full md:w-1/3 p-3 cardGradient">
              <Paragraph title={"Lowest Score"} className="text-white" />
              <Heading title="12%" className="text-4xl" />
            </Card>
          </div>
        )}

        <SubHeading title={`Announcements (${announcements.length})`} className="my-4" />

        {announcements.map((announcement, index) => (
          <Card className="w-full my-2" key={index}>
            {announcement.content}
            <Paragraph title={announcement.time} className="text-right" />
          </Card>
        ))}
      </section>

      <section className="w-full md:w-1/3 p-4">
        <SubHeading title={`Notifications (${allNotifications?.length})`} />
        <TicketAction notifications={allNotifications} />
      </section>
    </main>
  );
};

export default DashboardHome;
