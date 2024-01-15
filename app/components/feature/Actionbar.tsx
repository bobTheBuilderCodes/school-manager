"use client"
import { Button, Input } from '@/app/components';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import SubHeading from '@/app/components/ui/SubHeading';
import { api } from '@/services/endpoints';
import { postData } from '@/services/getData';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, FormEventHandler, useState } from 'react';


// ... (import statements remain unchanged)

const Actionbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const session = useSession();
    const router = useRouter()
  
    const userId = session.data?.user.userId;

  
    console.log("User id", userId);
  
    // forms
    const [formData, setFormData] = useState({
      ticketName: "",
      reason: "",
      ticketItem: "",
      ticketDate: new Date(),
    });
  
    const { ticketItem, ticketName, reason } = formData;
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    // Add new student
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = formData;
      const accessToken = session.data?.user.accessToken!
  
      try {
         postData({
          url: `${api.postTicket}/${userId}`,
          payload: formData,
          authToken: accessToken
        });
        //   getStudents();
        console.log("Student ticket", formData);
        router.refresh()
        closeModal(); // Close the modal after successful submission
      } catch (error) {
        console.log(error);
      }
    };
  
    // Handle change for each input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <SubHeading title="All Tickets" />
          <div className="flex items-center w-auto justify-end">
            <Select options={['Pending', 'Approved', 'Rejected']} />
            <Input placeholder='Search tickets by name'
              value={'' /* Provide the actual value for the search input */}
              onChange={() => {
                /* Provide the actual onChange function */
              }}
              name=""
              className="w-72 py-2 mx-6"
            />
            <Button title="Add Ticket" className="w-12" onClick={openModal} />
          </div>
        </div>
  
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SubHeading title="Add Ticket" className="mt-0 mb-4" />
          <form onSubmit={submitHandler}>
            <Input
              value={ticketName}
              onChange={handleChange}
              name="ticketName"
              className="w-full mb-4"
              placeholder="Enter ticket name" spellCheck={true}
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
            <Button title="Save" type="submit"  />
            {/* <button className='' type='submit' onClick={()=>alert("Working")}>Save</button> */}
          </form>
        </Modal>
      </div>
    );
  };
  
  export default Actionbar;
  