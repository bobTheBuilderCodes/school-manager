"use client";
import { Button, Input } from "@/app/components";
import Modal from "@/app/components/ui/Modal";
import SubHeading from "@/app/components/ui/SubHeading";
import { api } from "@/services/endpoints";
import { postData } from "@/services/getData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Select from "../ui/Select";
import Pagination from "./Pagination";

const Actionbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [page, setPage] = useState(1);

  const statusOptions = [
    {value: "", label: 'All'},
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
  ];

  const userId = session.data?.user.userId;

  // forms
  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    item: "",
    date: new Date(),
  });

  const { item, name, reason } = formData;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add new student
  const addTickets = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = formData;
    const authToken = session.data?.user.accessToken!;
    setIsLoading(false);
    try {
      setIsLoading(true);
      await postData({
        url: `${api.postTicket}/${userId}`,
        payload,
        authToken,
      });
      closeModal();
      router.refresh();
      setFormData({
        ...formData,
        item: "",
        reason: "",
        name: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle change for each input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: string = event.target.value;
    setSelectedValue(newValue);
    console.log(newValue);
  };

  const handleSearch = (): void => {
    // let url = `/dashboard/tickets`;
    let url = `/dashboard/tickets?page=${page}`;
    if (selectedValue) {
      url += `?status=${selectedValue}`;
    }

    if (searchTerm.trim().length > 0) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}name=${searchTerm}`;
    }
    router.push(url);
  };

  React.useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleSearch();
    }, 1000);

    setDebounceTimeout(newTimeout);

    return () => {
      if (newTimeout) {
        clearTimeout(newTimeout);
      }
    };
  }, [searchTerm, selectedValue, page, debounceTimeout, handleSearch]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full mb-4">
        <SubHeading title="All Tickets" />
        <div className="flex items-center w-auto justify-end">
          <Select
            id="mySelect"
            value={selectedValue}
            onChange={handleSelectChange}
            options={statusOptions}
          />
          <Input
            placeholder="Search tickets by name"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
            }}
            name=""
            className="w-72 py-2 mx-6"
          />
          <Button title="Add Ticket" className="w-12" onClick={openModal} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubHeading title="Add Ticket" className="mt-0 mb-4" />
        <form onSubmit={addTickets}>
          <Input
            value={name}
            onChange={handleChange}
            name="name"
            className="w-full mb-4"
            placeholder="Enter ticket name"
          />
          <Input
            value={item}
            onChange={handleChange}
            name="item"
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
        {/* <AddTicketForm /> */}
      </Modal>
      
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default Actionbar;
