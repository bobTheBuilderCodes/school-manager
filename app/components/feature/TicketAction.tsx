"use client"

import React, { useState } from "react";
import { approveTicket, rejectTicket } from "@/services/tickets";
import { Button, Card, Paragraph } from "..";
import SubHeading from "../ui/SubHeading";
import { api } from "@/services/endpoints";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "../ui/Modal";

interface Notification {
  content: string;
  id: number;
  isRead: boolean;
  ticketId: number; 
}

interface NotificationsProps {
  notifications: Notification[];
}

const TicketAction = ({ notifications }: NotificationsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null); 
  const session = useSession();
  const authToken = session.data?.user.accessToken as string;
  const router = useRouter();

  const openModal = (ticketId: number) => {
    setSelectedTicketId(ticketId); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const approveTicketHandler = async (id: number) => {
    try {
      await approveTicket({
        method: "POST",
        url: `${api.approveTicket}/${id}`,
        authToken,
        payload: { ticketId: id },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectTicketHandler = async () => {
    try {
      if (selectedTicketId !== null) {
        await rejectTicket({
          method: "POST",
          url: `${api.rejectTicket}/${selectedTicketId}`,
          authToken,
          payload: { ticketId: selectedTicketId },
        });
        router.refresh();
      }

      alert(selectedTicketId)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {notifications.map(({ content, id, isRead, ticketId }) => (
        <Card
          className={`my-4 h-auto bg-red w-full ${isRead && "bg-blue-500"}`}
          key={id}
        >
          <SubHeading className="text-sm text-gray-400 mb-5" title={content} />
          <button
            onClick={() => approveTicketHandler(ticketId)}
            className="text-green-500 bg-gray-800 rounded-md px-4 py-2"
          >
            Approve
          </button>
          <button
            onClick={() => openModal(ticketId)} // Pass ticketId to openModal
            className="text-red-500 mx-6 bg-gray-800 rounded-md px-4 py-2"
          >
            Reject
          </button>
        </Card>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubHeading title="Delete Ticket?" className="mt-0 mb-4" />
        <Paragraph
          title={
            "Are you sure you want to delete this ticket? This ticket's records will be permanently deleted"
          }
          className="mb-8"
        />
        <Button
          className="mb-6"
          onClick={rejectTicketHandler}
          title={isLoading ? "Hang on dude..." : "Delete ticket"}
          type="submit"
        />
      </Modal>
    </div>
  );
};

export default TicketAction;
