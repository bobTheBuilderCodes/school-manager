// Pagination.tsx
"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
//   onPageChange: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
//   onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [page, setPage] =useState(2)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const router = useRouter()

  const handleNextPageChange = () => {
   router.push(`/dashboard/tickets?page=${page}&size=2`)
  }

  return (
    <div className="flex justify-end items-center space-x-2 mt-4">
      <button
        className={`px-4 py-2 cursor-pointer ${currentPage === 1 ? 'text-gray-500' : 'text-gray-500'} `}
        // onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} `}
        //   onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`px-4 py-2 cursor-pointer ${currentPage === totalPages ? 'text-gray-500' : 'text-gray-500'} `}
        onClick={handleNextPageChange}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
