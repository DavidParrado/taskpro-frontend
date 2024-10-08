"use client";
import Link from "next/link";
import ThemeChanger from "../landing/DarkSwitch";
import Image from "next/image"
import { getDecodedToken } from "@/utils/authHelpers";
import { useEffect, useState } from "react";

export const Topbar = () => {
  const [userName, setUserName] = useState("User");
  const decoded = getDecodedToken();

  useEffect(() => {
    if (decoded) {
      setUserName(decoded.user.name);
    }
  }, [])


  return (
    <nav className="w-full relative flex flex-wrap items-center justify-between py-3 px-4 lg:px-6 xl:px-8 border-b dark:border-b-slate-500">
      {/* Logo  */}
      <Link href="/">
        <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
          <span>
            <Image
              src="/imgs/logo.svg"
              width="32"
              alt="N"
              height="32"
              className="w-8"
            />
          </span>
          <span>Taskpro</span>
        </span>
      </Link>

      {/* get started  */}
      <div className="gap-3 nav__item mr-2 flex ml-0 order-2">
        <ThemeChanger />
        <div className="mr-3 flex nav__item">
          <span className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            Hola, {userName}
          </span>
        </div>
      </div>
    </nav>
  );
}

