"use client"
import { Button, Input } from '@/app/components';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import SubHeading from '@/app/components/ui/SubHeading';
import React, { useState } from 'react';


const Actionbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full'>
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
     
      <Modal isOpen={isModalOpen} onClose={closeModal}>
       <SubHeading title='Add Ticket' className='mt-0 mb-4'/>
       <Input value='' onChange={()=>{}} name='' className='w-full mb-4' placeholder='Enter your title'/>
       <Input value='' onChange={()=>{}} name='' className='w-full mb-4 h-20 flex items-start justify-start' placeholder='Enter your reason' />
       <Button title='Save' />
      </Modal>
    </div>
  );
};

export default Actionbar;
