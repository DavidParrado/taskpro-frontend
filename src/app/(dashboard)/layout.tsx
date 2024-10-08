import type { Metadata } from "next";

import { Sidebar } from "@/components";
import { Topbar } from "@/components";

export const metadata: Metadata = {
  title: "TaskPro",
  description: "Application for task management",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full">
      <Topbar />
      <div className="flex w-full h-[calc(100%-69px)]">
        <Sidebar />
        <div className="w-full px-8 py-6 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
