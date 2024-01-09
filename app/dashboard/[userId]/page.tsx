import { Button, Card, Heading, Paragraph } from "@/app/components";
import SubHeading from "@/app/components/ui/SubHeading";
import assets from "@/resources/assets";
import { api } from "@/services/endpoints";
import { getSingleData, getStudentData } from "@/services/getData";
import { StudentDetails } from "@/types/StudentProps";
import Image from "next/image";
import React from "react";

interface UserProps {
  params: {
    userId: string;
  };
}
const UserProfile = async ({ params }: UserProps) => {
  const currentStudent: StudentDetails = await getStudentData(
    `${api.singleStudent}/${params.userId}`
  );
  console.log("User", currentStudent)

  const { firstName, email, middleName, lastName, role } = currentStudent;
  
  return (
    <div className="flex justify-center">
      <div className="w-2/3 mt-5 flex flex-col items-center">
        {/* <Heading title='My Profile' /> */}
        <Card className="flex w-[70%] items-center">
          <Image
            src={assets.logo}
            alt="Schoolsphere logo"
            width={120}
            height={120}
            className="rounded-full mx-5"
          />
          <div className="mr-auto">
            <Heading title={`${firstName} ${lastName}`} className="mb-3" />
            <Paragraph title={email} className="mb-5" />
            <div className="flex items-center">
              <p className="textClip">Edit Profile</p>
              <Paragraph title={"|"} className="mx-4" />
              <p className="text-red-700 font-medium cursor-pointer">
                Delete Account
              </p>
            </div>
          </div>
        </Card>
        {/* More info */}
        <section className="mt-4 ">
          {/* <SubHeading title={`${firstName} ${middleName || ''} ${lastName}`} />
          <Paragraph title={email} /> */}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
