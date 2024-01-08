"use client";

import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";

const Navbar = () => {
  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const content = (
    <div>
      <p className="mb-3">My Profile</p>
     
      
    </div>
  );

  return (
    <nav className="border-b-2 border-gray-900 bg-[#0E1117] p-3 w-full h-auto z-20">
      {
        <p onClick={()=>signOut({
          callbackUrl: '/'
        })}>
          Sign Out
        </p>
      }
     {content}
    </nav>
  );
};

export default Navbar;
