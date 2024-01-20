import { addPerson } from "@/actions/people.server";
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
import { unstable_noStore } from "next/cache";
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
    
    unstable_noStore()
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
