import assets from '@/resources/assets';
import { StudentProps } from '@/types/StudentProps';
import Image from 'next/image';
import { Paragraph } from '..';


const StudentCard = ({ username, email, gender }: StudentProps) => {
  return (
    <div className='bg-[#131a23] flex gap-2 border-2 border-gray-900 cursor-pointer rounded-md w-[30%] mb-8 hover:bg-gray-900 hover:scale-105 transition-all duration-250'>
      <Image src={assets.logo} alt='logo' height={120} width={120} />
      <div className='mx-4 py-1'>
        <p className='font-semibold py-2 text-gray-100 text-xl'>{username}</p>
       <Paragraph title={email} className='py-1' />
       <Paragraph title={gender} />
       
      </div>
    </div>
  );
};

export default StudentCard;
