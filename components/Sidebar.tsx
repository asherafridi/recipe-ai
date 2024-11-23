"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  LineChart,
  Key,
  CodeXml,
  Text,
  Settings,
  ChefHat,
  Heart,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebar, setSidebar }: { sidebar: any; setSidebar: any }) => {
  const pathname = usePathname();

  // State to manage open/close of submenus
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  // Define the menu items and their submenus
  const menuItems = [
    { href: "/home", icon: <Home />, text: "Home", key: "home" },
    {
      href: "/favourites", icon: <Heart />, text: "Favourites", key: "favourites",
    },
  ];

  // Function to toggle submenu open/close
  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`sidebar w-[300px] min-h-screen bg-background border-r border-gray-300 text-accent-foreground lg:fixed shadow-sm lg:block ${sidebar ? "block" : "hidden"
          }`}
      >
        
        <div className="logo p-4 text-xl font-bold hidden  lg:flex items-center"><ChefHat className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">RecipeAI</span></div>
        <div className="mt-32">
          <ul className="grid gap-2 menu">
            {menuItems.map(({ href, icon, text, key }) => (
              <React.Fragment key={key}>
                {/* Main Menu Item */}
                <li>
                  <Link
                    href={ href}
                    className={`flex p-4 py-3 text-secondary-foreground gap-4 cursor-pointer hover:bg-secondary-hover ${pathname.includes(href) ? "active" : ""
                      }`}
                  >
                    {icon}
                    <span>{text}</span>
                  </Link>

                  
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
