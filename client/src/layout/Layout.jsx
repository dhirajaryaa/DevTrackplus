import AppSidebar from "@/components/custom/AppSidebar";
import Header from "@/components/custom/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col p-3">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
