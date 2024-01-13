import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button, Heading, Input, Paragraph } from "@/app/components";
import Actionbar from "@/app/components/feature/Actionbar";
import Actions from "@/app/components/feature/Actions";
import Modal from "@/app/components/ui/Modal";
import Select from "@/app/components/ui/Select";
import SubHeading from "@/app/components/ui/SubHeading";
import Table from "@/app/components/ui/Table";
import { api } from "@/services/endpoints";
import { getStudentTickets } from "@/services/getData";
import { getServerSession } from "next-auth";
import React from "react";

const Tickets = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  const {studentTickets} = await getStudentTickets(
    `${api.studentTickets}/${userId}`
  );
  // const data = studentTickets ;
// console.log("Tickets", data)
  const myData = [{ name: "", age: 22 }];

  return (
    <div>
      <div className="flex justify-between items-center">
        <Actionbar />
      </div>
      <Table
        data={studentTickets}
        visibleColumns={["ticketName", "reason", "ticketDate", "ticketStatus"]}
        actions={
          <Actions>
            <Paragraph title={"Edit"} className="cursor-pointer" />
            <Paragraph title={"Delete"} className="mx-4 cursor-pointer" />
          </Actions>
        }
      />
    </div>
  );
};

export default Tickets;
