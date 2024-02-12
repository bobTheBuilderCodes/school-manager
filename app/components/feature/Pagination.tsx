import SubHeading from '../ui/SubHeading';

// Define a type for the props
type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };



  return (
    <div className="text-right my-4 flex justify-end items-center">
      <button className='bg-gray-700 p-2 rounded-md mx-2' onClick={handlePreviousPage} disabled={page <= 1}>
        Previous
      </button>
     <SubHeading title={page} className='mx-3 font-black text-xl' />
    
      <button className="mx-2 bg-gray-700 p-2 rounded-md" onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
