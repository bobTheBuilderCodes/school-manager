import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paragraph } from "..";
import { ReactElement } from "react";
import hoverClass from "@/resources/hoverClass";

interface NavItemProps {
  icon: ReactElement;
  title: string;
  slug: string;
}

const NavItem = ({ icon, title, slug }: NavItemProps) => {
  const currentPath = usePathname();
  const activePath =
    currentPath === slug ? "rounded-md w-full gradient mb-3" : "";

  return (
    <div className={`flex cursor-pointer mx-3`}>
      <Link href={slug} className={`font-medium px-3 py-3 ${activePath} `}>
        <nav className="flex items-center">
          <span className="mr-3 -mt-2">
            {icon}
            </span>
          <Paragraph title={title} className="opacity-70" />
         
        </nav>
      </Link>
    </div>
  );
};

export default NavItem;
