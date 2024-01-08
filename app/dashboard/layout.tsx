import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 bg-[#0D1218]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
