"use server";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { api } from '@/services/endpoints';
import { revalidatePath } from 'next/cache';

export const addNewTicket = async (formData: FormData) => {
  const ticketName = formData.get("ticketName");
  const ticketItem = formData.get("ticketItem");
  const reason = formData.get("reason");
  const currentDate = formData.get("currentDate");

  if (!ticketName || !ticketItem || !reason) return;

  const newTicket = {
    ticketName,
    ticketItem,
    reason,
    currentDate,
  };

  const session = await getServerSession(authOptions);
  const authToken = session?.user.accessToken;
  const userId = session?.user.userId;

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  await fetch(`${api.studentTickets}/${userId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newTicket),
  });

  // Assuming revalidateTag is a server-side utility function
  revalidatePath("/dashboard/tickets");
};


