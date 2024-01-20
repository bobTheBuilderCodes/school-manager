"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { api } from "@/services/endpoints";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const addPerson = async (formData: FormData) => {

  const session = await getServerSession(authOptions);
  const authToken = session?.user.accessToken;
  const userId = session?.user.userId;
   
    const ticketName = formData.get("ticketName");
    const ticketItem = formData.get("ticketItem");
    const reason = formData.get("reason");
    const ticketDate = formData.get("ticketDate");

    const newTicket = { ticketName, ticketItem, reason, ticketDate:new Date() };

    await fetch("https://65a95f44219bfa371869216b.mockapi.io/api/v1/tickets", {
    // await fetch(`${api.studentTickets}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    });
    revalidateTag("tickets")
  };