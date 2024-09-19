"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Phone,
  Headphones,
  PhoneIncoming,
  Users,
  PhoneOutgoing,
  Webhook,
  PenTool,
  ChevronDown,
  ChevronUp,
  CalendarClock,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebar, setSidebar }: { sidebar: any; setSidebar: any }) => {
  const pathname = usePathname();

  // State to manage open/close of submenus
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  // Define the menu items and their submenus
  const menuItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, text: "Dashboard", key: "dashboard" },
    {
      href: "/appointment", icon: <CalendarClock />, text: "Appointment", key: "appointment",
      submenu: [
        { href: "/appointment/gohighlevel", text: "GoHighLevel", key: "goHighLevel-appointment" },
        { href: "/appointment/veta", text: "Veta Appointments", key: "appointments" },
      ],
    },
    { href: "/number", icon: <Phone />, text: "Phone Numbers", key: "number" },
    { href: "/agent", icon: <Headphones />, text: "Agents", key: "agent" },
    { href: "/inbound-agent", icon: <PhoneIncoming />, text: "Inbound Agent", key: "inbound-agent" },
    {
      href: "/contact",
      icon: <Users />,
      text: "Contacts",
      key: "contact",
      submenu: [
        { href: "/contact", text: "All Contacts", key: "contact-all" },
        { href: "/contact/groups", text: "Groups", key: "contact-groups" },
      ],
    },
    { href: "/call", icon: <PhoneOutgoing />, text: "Calls", key: "call" },
    {
      href: "/campaign",
      icon: <Webhook />,
      text: "Campaigns",
      key: "campaign",
    },
    { href: "/vector", icon: <PenTool />, text: "Information", key: "vector" },
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
        <div className="hidden  p-3  lg:flex pt-10 justify-center">
          <img src="/logo.png" width={80}/>
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
