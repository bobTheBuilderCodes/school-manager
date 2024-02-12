"use client";

import assets from "@/resources/assets";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Paragraph } from "..";
import hoverClass from "@/resources/hoverClass";
import Link from "next/link";
import {  EditOutlined , BellOutlined} from "@ant-design/icons";

interface NavbarProps{
  className?: string
}

const Navbar = ({className}: NavbarProps) => {

  const {data} = useSession()
  const userId = data?.user.userId
  return (
    <nav className={` border-b-2 border-gray-900 bg-[#0E1117] p-3 w-full h-auto z-50 flex justify-between items-center ${className}`}>
      <>
        <p></p>
      </>
      <div className="flex items-center w-2/5 justify-between">
        <Link href={"/dashboard/tickets"}>
          <Paragraph
            title={"Raise a Ticket"}
            className={`hover:${hoverClass.hovered}`}
          />
        </Link>
        <Paragraph title={"|"} />
        <Link href={`/dashboard/${userId}`}>
          <Paragraph
            title={"My Profile"}
            className={`hover:${hoverClass.hovered}`}
          />
        </Link>
        <Paragraph title={"|"} />
        <div className="bg-gray-700 p-2 rounded-full flex items-center justify-center cursor-pointer">

        <BellOutlined size={40}/>
        </div>
        <p
          className="textClip"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign Out
        </p>
        <Image
          src={assets.logo}
          alt="Schoolsphere logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      
    </nav>
  );
};

export default Navbar;
