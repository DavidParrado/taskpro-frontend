import type { Metadata } from "next";

import { Navbar } from "@/components";
import { Footer } from "@/components";
import { PopupWidget } from "@/components";


export const metadata: Metadata = {
  title: "TaskPro",
  description: "Application for task management",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="xl:px-8">{children}</div>
      {/* <Footer /> */}
      {/* <PopupWidget /> */}
    </>
  );
}
