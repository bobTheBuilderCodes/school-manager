import { getServerSession } from "next-auth";
import { Card, Heading, Paragraph } from "../components";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getNotifications } from "@/services/getData";
import SubHeading from "../components/ui/SubHeading";

const DashboardHome = async () => {
  const session = await getServerSession(authOptions);

  const loggedInUser = session?.user.loggedInUser;
  const userRole = session?.user.userRole;

  const allNotifications: notification[] = await getNotifications();

  const announcements = [
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
    {
      content: "This is an annoucement",
      time: "Today, 2pm",
    },
  ];

  return (
    <main className="flex h-screen">
      <section className="w-3/4">
        <Heading title={`Welcome ${loggedInUser}`} />
        {/* Start of admin stats */}
        {userRole === "admin" && (
          <div className="flex">
            <Card className="my-6 mr-6 cardGradient">
              <Paragraph
                title={"Total students"}
                className="mb-3 text-white opacity-100"
              />
              <Heading title="1,520" className="text-4xl" />
            </Card>
            <Card className="my-6 mr-6 cardGradient">
              <Paragraph
                title={"Total teachers"}
                className="mb-3  text-white opacity-100"
              />
              <Heading title="50" className="text-4xl" />
            </Card>
            <Card className="my-6 mr-6 cardGradient">
              <Paragraph
                title={"Total parents"}
                className="mb-3  text-white opacity-100"
              />
              <Heading title="120" className="text-4xl" />
            </Card>
          </div>
        )}
        {/* End of admin stats  */}

        {/* Start of Student data */}

        {userRole === "student" && (
          <div className="flex justify-between">
            <Card className="my-6 cardGradient">
              <Paragraph
                title={"My competitions"}
                className="mb-3 text-white opacity-100"
              />
              <Heading title="520" className="text-4xl" />
            </Card>
            <Card className="my-6 mx-3 cardGradient">
              <Paragraph
                title={"Highest Score"}
                className="mb-3  text-white opacity-100"
              />
              <Heading title="88%" className="text-4xl" />
            </Card>
            <Card className="my-6 cardGradient">
              <Paragraph
                title={"Lowest Score"}
                className="mb-3  text-white opacity-100"
              />
              <Heading title="12%" className="text-4xl" />
            </Card>
          </div>

          // Announcements
        )}

<SubHeading title={`Announcements (${announcements?.length || 0})`} className="my-7" />

        {announcements.map((announcement) => (
          <>
            <Card className="w-full my-4" key={Math.random()}>
              {announcement.content}
              <Paragraph title={announcement.time} className="text-right" />
            </Card>
          </>
        ))}
      </section>
      <section>
        <SubHeading
          title={`Notifications (${allNotifications?.length || 0})`}
        />
        {allNotifications?.map(({ content, id, isRead }) => (
          <Card className={`my-4 h-auto bg-red ${isRead && "bg-blue-500"}`} key={id}>
            <h2 className="mb-3">{content}</h2>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default DashboardHome;
