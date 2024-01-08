"use client";

import assets from "@/resources/assets";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Paragraph } from "..";
import hoverClass from "@/resources/hoverClass";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-900 bg-[#0E1117] p-3 w-full h-auto z-20 flex justify-between items-center">
   <>
   <p></p>
   </>
      <div className="flex items-center w-2/5 justify-between">
        <Link href={'/dashboard/tickets'}>
   <Paragraph title={'Raise a Ticket'} className={`hover:${hoverClass.hovered}`} />
        </Link>
   <Paragraph title={'|'} />
   <Paragraph title={'My Profile'} className={`hover:${hoverClass.hovered}`} />
   <Paragraph title={'|'} />
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
