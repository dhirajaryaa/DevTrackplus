import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Logo } from "./Header";
import { AlarmClockCheckIcon, ChartBar, Home, ListTodo } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function AppSidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <Home />, href: "/dashboard" },
    { label: "Tasks", icon: <ListTodo />, href: "/tasks" },
    {
      label: " Time Tracker",
      icon: <AlarmClockCheckIcon />,
      href: "/time-tracker",
    },
    { label: "Reports & Analytics", icon: <ChartBar />, href: "/reports" },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className={"mt-5"}>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navItems?.map((item) => (
              <Link to={item.href} key={item.label}>
                <SidebarMenuItem className={"mb-1"}>
                  <SidebarMenuButton
                    isActive={pathname == item.href}
                    tooltip={item.label}
                    className={"px-3 py-5 text-base font-semibold"}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="font-semibold p-2 bg-muted rounded">
          Made with ❤️ by{" "}
          <a
            target="_blank"
            href="http://github.com/dhirajaryaa"
            className="underline"
          >
            Dhiraj Arya{" "}
          </a>
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
