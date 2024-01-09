import { Heading } from "@/app/components";
import StudentCard from "@/app/components/ui/StudentCard";
import { getData } from "@/services/getData";
import { StudentDetails } from "@/types/StudentProps";
import React, { Suspense } from "react";



const Students = async () => {
  const students : StudentDetails[] = await getData(); 
  
  return (
    <>
      <Heading title="All Students" className="mb-4" />
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex justify-between flex-wrap">
          {students?.map(({email,firstName, rollId, gender, username}) => (
            <StudentCard
              key={rollId} 
              firstName={firstName}
              gender={gender}
              username={username}
              email={email}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default Students;
