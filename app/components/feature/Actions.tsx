"use client"

import { deleteTicket, postData } from '@/services/getData';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import SubHeading from '../ui/SubHeading';
import { Button, Input, Paragraph } from '..';
import { api } from '@/services/endpoints';
import { useSession } from 'next-auth/react';
import {  EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionProps {
  ticketId: number;
}

enum ModalType {
  Edit = 'Edit',
  Delete = 'Delete',
}

const Actions: React.FC<ActionProps> = ({ ticketId }) => {
  const router = useRouter();
  const session = useSession();
  const authToken = session.data?.user.accessToken!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    reason: '',
    item: '',
    date: new Date(),
  });

  const { item, name, reason } = formData;

  const openModal = (type: ModalType) => {
    fetchTicket();
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (modalType === ModalType.Delete) {
        await deleteTicket(ticketId, authToken);
        router.refresh();
      } else if (modalType === ModalType.Edit) {
        const payload = formData;
        await postData({
          url: `${api.editTicket}/${ticketId}`,
          method: 'PATCH',
          payload,
          authToken,
        });
        router.refresh();
        alert('Ticket edited successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const fetchTicket = async () => {
    try {
      const res = await fetch(`${api.getTicket}/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      setFormData(data?.fetchedTicket);
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  return (
    <>
      <div className='flex'>
        <p
          className='mx-5 m-0 text-sm opacity-50 cursor-pointer'
          onClick={() => openModal(ModalType.Edit)}
        >
          <EditOutlined />
        </p>
        <p
          onClick={() => openModal(ModalType.Delete)}
          className='m-0 text-sm opacity-50 cursor-pointer'
        >
          <DeleteOutlined />
        </p>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubHeading
          title={
            modalType === ModalType.Edit
              ? 'Edit Ticket'
              : 'Delete Ticket'
          }
          className='mt-0 mb-4'
        />
        <form onSubmit={handleFormSubmit}>
         
          {modalType === ModalType.Edit && (
            <>
              {/* Edit form fields */}
              <Input
                value={name}
                onChange={handleChange}
                name='name'
                className='w-full mb-4'
                placeholder='Enter ticket name'
              />
              <Input
                value={item}
                onChange={handleChange}
                name='item'
                className='w-full mb-4'
                placeholder='Enter your title'
              />
              <Input
                value={reason}
                onChange={handleChange}
                name='reason'
                className='w-full mb-4 h-20 flex items-start justify-start'
                placeholder='Enter your reason'
              />
            </>
          )}
          {modalType === ModalType.Delete && (
            <Paragraph
              title={
                'Are you sure you want to delete this ticket? You cannot undo your changes again.'
              }
              className='mb-8'
            />
          )}
          <Button
            title={
              isLoading
                ? modalType === ModalType.Delete
                  ? 'Deleting...'
                  : 'Hang on dude...'
                : modalType === ModalType.Delete
                ? 'Delete ticket'
                : 'Save Changes'
            }
            type='submit'
          />
        </form>
      </Modal>
    </>
  );
};

export default Actions;
