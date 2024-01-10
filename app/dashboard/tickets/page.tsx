import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button, Heading, Input, Paragraph } from "@/app/components";
import Actions from "@/app/components/feature/Actions";
import Modal from "@/app/components/ui/Modal";
import SubHeading from "@/app/components/ui/SubHeading";
import Table from "@/app/components/ui/Table";
import { api } from "@/services/endpoints";
import { getStudentTickets } from "@/services/getData";
import { getServerSession } from "next-auth";
import React from "react";

const Tickets = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  const studentTickets = await getStudentTickets(
    `${api.studentTickets}/${userId}`
  );
  const data = studentTickets.data.studentTickets;

  const myData = [{ name: "", age: 22 }];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-full mb-4">
          <SubHeading title="All Tickets" />
          <div className="flex items-center w-1/3 justify-end bg-green-200">
            <Input placeholder="Search tickets by name" name="" className="w-72 py-2"/>
            <Button title="Add Ticket" className="w-12 mr-3" />
          </div>
        </div>
      </div>
      <Table
        data={data}
        visibleColumns={["ticketName", "reason", "ticketDate", "ticketStatus"]}
        actions={
          <Actions>
            <Paragraph title={"Edit"} className="cursor-pointer" />
            <Paragraph title={"Delete"} className="mx-4 cursor-pointer" />
          </Actions>
        }
      />
      {/* <Modal >
          <SubHeading title='Add Ticket' />
        </Modal> */}
    </div>
  );
};

export default Tickets;
