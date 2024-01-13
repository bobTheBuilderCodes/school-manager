"use client"
import { Button, Input } from '@/app/components';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import SubHeading from '@/app/components/ui/SubHeading';
import React, { useState } from 'react';


const NewPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-4">
          <SubHeading title="All Tickets" />
          <div className="flex items-center w-auto justify-end">
           <Select options={['Pending', 'Approved', 'Rejected']} />
            <Input
              placeholder="Search tickets by name"
              name=""
              className="w-72 py-2 mx-6"
            />
            <Button title="Add Ticket" className="w-12" onClick={openModal} />
          </div>
        </div>
      {/* Render the Modal component with isOpen and onClose props */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Modal content goes here */}
        <h2>Hello from the modal!</h2>
        <p>This is some modal content.</p>
      </Modal>
    </div>
  );
};

export default NewPage;
