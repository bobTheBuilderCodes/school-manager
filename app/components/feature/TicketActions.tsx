"use client";

import { FormEvent, useState } from "react";
import { Button, Input, Paragraph } from "..";
import Modal from "../ui/Modal";
import SubHeading from "../ui/SubHeading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/services/endpoints";
import { postData } from "@/services/getData";

const TicketActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDeleteModal, isSetOpenDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  // forms
  const [formData, setFormData] = useState({
    ticketName: "",
    reason: "",
    ticketItem: "",
    ticketDate: new Date(),
  });

  const { ticketName, ticketItem, reason } = formData;

  // Handle change for each input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    isSetOpenDeleteModal(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const closeDeleteModal = () => {
    isSetOpenDeleteModal(false)
  };

  // Add edit ticket
  const editTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = formData;
    const authToken = session.data?.user.accessToken!;
    setIsLoading(false);
    try {
      setIsLoading(true);
      await postData({
        method: 'PATCH',
        url: `${api.editTicket}/51`,
        payload,
        authToken,
      });
      closeModal();
      router.refresh();
      setFormData({
        ...formData,
        ticketItem: "",
        reason: "",
        ticketName: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubHeading title="Edit Ticket" className="mt-0 mb-4" />
        <form onSubmit={editTicket}>
          <Input
            value={ticketName}
            onChange={handleChange}
            name="ticketName"
            className="w-full mb-4"
            placeholder="Enter ticket name"
          />
          <Input
            value={ticketItem}
            onChange={handleChange}
            name="ticketItem"
            className="w-full mb-4"
            placeholder="Enter your title"
          />
          <Input
            value={reason}
            onChange={handleChange}
            name="reason"
            className="w-full mb-4 h-20 flex items-start justify-start"
            placeholder="Enter your reason"
          />
          <Button
            title={isLoading ? "Hang on dude..." : "Save"}
            type="submit"
          />
        </form>
      </Modal>

      {/* Delete modal */}
      <Modal isOpen={isOpenDeleteModal} onClose={closeDeleteModal}>
        <SubHeading title="Delete Ticket" className="mt-0 mb-4" />
        <form>
          
          <Paragraph title={'Are you sure you want to delete this ticket? You cannot undo your changes again.'} className="mb-8" />
          <Button
            title={isLoading ? "Deleting..." : "Delete ticket"}
            type="submit"
          />
        </form>
      </Modal>
    </>
  );
};

export default TicketActions;
