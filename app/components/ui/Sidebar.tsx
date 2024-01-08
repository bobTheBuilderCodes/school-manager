"use client";

import React, { useState } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import { navItems } from "@/resources/navItems";
import assets from "@/resources/assets";
import { AppstoreOutlined, HomeOutlined, DoubleRightOutlined, DoubleLeftOutlined , SettingOutlined, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const Sidebar = () => {

    const navIcons = [<HomeOutlined key={Math.random() * 2300} />, <AppstoreOutlined key={Math.random() * 2300} />, <TeamOutlined key={Math.random() * 2300} />, <UsergroupAddOutlined key={Math.random() * 2300} />, <SettingOutlined key={Math.random() * 2300}/>]
  const [isOpen, setIsOpen] = useState(false);

  const navStyle = isOpen ? "w-[70px]" : "w-[200px]";

  return (
    <div
      className={`bg-[#0E1117] h-screen border-r-2 border-gray-900 transition-all duration-3000 cursor-pointer ${navStyle}`}
    >
      <div className="flex justify-between mx-3 rounded-full ">
        <Image
          src={assets.logo}
          alt="Schoolsphere logo"
          width={40}
          height={40}
          onClick={() => setIsOpen(!isOpen)}
          className=" my-5 rounded-full"
        />
        <button onClick={() => setIsOpen(!isOpen)} title="Collapse sidebar">
        {isOpen ? '' : <DoubleLeftOutlined />}
        </button>
      </div>

      {navItems.map((navItem, index) => (
       
        <NavItem
          key={navItem.title}
          title={!isOpen ? navItem.title : ""}
          icon={navIcons[index]}
          slug={navItem.slug}
        />
      ))}
      
    </div>
  );
};

export default Sidebar;
