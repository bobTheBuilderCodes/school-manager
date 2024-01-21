"use client"

import { deleteTicket, postData } from '@/services/getData';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import SubHeading from '../ui/SubHeading';
import { Button, Input, Paragraph } from '..';
import { api } from '@/services/endpoints';

interface ActionProps {
  ticketId: number;
  authToken: string;
}

const Actions: React.FC<ActionProps> = ({ ticketId, authToken }) => {
  const router  = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDeleteModal, isSetOpenDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

    // forms
    const [formData, setFormData] = useState({
      ticketName: "",
      reason: "",
      ticketItem: "",
      ticketDate: new Date(),
    });
  
    const { ticketItem, ticketName, reason } = formData;


   


  const deleteTicketHandler = async () => {
    setIsLoading(true)
    try {
      await deleteTicket(ticketId, authToken);
      setIsLoading(false)
      router.refresh()
      alert('Deleted successfully');
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false)
    }finally{
      setIsLoading(false)
    }
  };

 

 // Edit ticket
 const editTicketHandler = async(e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const payload = formData;
  // const authToken = session.data?.user.accessToken!;
setIsLoading(false)
  try {
    setIsLoading(true)
    await postData({
      url: `${api.editTicket}/${ticketId}`,
      method: 'PATCH',
      payload,
  
      authToken,
    });
    closeModal(); 
    router.refresh()
    alert("Ticked edited successfully")
  } catch (error) {
    console.log(error);
  }finally{
    setIsLoading(false)
  }
};




  const fetchTicket = async()=>{
    const res = await fetch(`https://schoolsphere-backend.onrender.com/v1/ticket/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
    const data = await res.json()
    console.log("Ticket details", data?.fetchedTicket)
    setFormData(data?.fetchedTicket)
  }

  const openModal = () => {
      fetchTicket()
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    isSetOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    isSetOpenDeleteModal(false)
  };
    // Handle change for each input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  return (
    <>
    <div className='flex'>
      <p className='mx-5 m-0 text-sm opacity-50 cursor-pointer' onClick={openModal}>
        Edit
      </p>
      <p onClick={openDeleteModal} className='m-0 text-sm opacity-50 cursor-pointer'>Delete</p>
    </div>
    {/* Edit Modal */}
    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubHeading title="Edit Ticket" className="mt-0 mb-4" />
        <form onSubmit={editTicketHandler}>
          <Input value={ticketName} onChange={handleChange}
            name="ticketName"
            className="w-full mb-4"
            placeholder="Enter ticket name"
          />
          <Input value={ticketItem} onChange={handleChange}
            name="ticketItem"
            className="w-full mb-4"
            placeholder="Enter your title"
          />
          <Input value={reason} onChange={handleChange}
            name="reason"
            className="w-full mb-4 h-20 flex items-start justify-start"
            placeholder="Enter your reason"
          />
          <Button title={isLoading ? "Hang on dude..." : "Save Changes"} type="submit" />
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isOpenDeleteModal} onClose={closeDeleteModal}>
        <SubHeading title="Delete Ticket" className="mt-0 mb-4" />
        <form onSubmit={deleteTicketHandler}>
          
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

export default Actions;
