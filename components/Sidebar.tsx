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
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebar, setSidebar }: { sidebar: any; setSidebar: any }) => {
  const pathname = usePathname();

  // State to manage open/close of submenus
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  // Define the menu items and their submenus
  const menuItems = [
    { href: "/dashboard", icon: <Home />, text: "Home", key: "dashboard" },
    {
      href: "/analytics", icon: <LineChart />, text: "Analytics", key: "appointment",
    },
    { href: "/keywords", icon: <Key />, text: "Keywords", key: "number" },
    { href: "/code-changes", icon: <CodeXml />, text: "Code Changes", key: "agent",
      submenu: [
        { href: "/code-changes/code-preview", text: "Code Preview", key: "goHighLevel-appointment" },
        { href: "/code-changes/page-insights", text: "Page Insights", key: "appointments" },
      ], },
    { href: "/blog-posts", icon: <Text />, text: "Blog Posts", key: "inbound-agent" },
    { href: "/settings", icon: <Settings />, text: "Settings", key: "call" },
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
        <div className="hidden lg:flex ">
          <h1 className="logo p-4 px-12 text-xl font-bold">seostyle-ai</h1>
          {/* <p>AI Calling Assistant</p> */}
        </div>
        <div className="mt-16">
          <ul className="grid gap-2 menu">
            {menuItems.map(({ href, icon, text, key, submenu }) => (
              <React.Fragment key={key}>
                {/* Main Menu Item */}
                <li>
                  <Link
                    href={submenu ? '#' : href}
                    className={`flex p-4 py-3 text-secondary-foreground gap-4 cursor-pointer hover:bg-secondary-hover ${pathname.includes(href) ? "active" : ""
                      }`}
                    onClick={() => (submenu ? toggleSubmenu(key) : setSidebar(false))}
                  >
                    {icon}
                    <span>{text}</span>
                    {submenu && (openSubmenus[key] ? <ChevronUp className="ml-auto" /> : <ChevronDown className="ml-auto" />)}
                  </Link>

                  {/* Submenu Items */}
                  {submenu && openSubmenus[key] && (
                    <ul className=" space-y-2  bg-gray-300">
                      {submenu.map(({ href, text, key }) => (
                        <li key={key}>
                          <Link
                            href={href}
                            className={`flex p-2 pl-8 text-secondary-foreground hover:bg-secondary-hover`}
                            onClick={() => setSidebar(false)}
                          >
                            {text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
