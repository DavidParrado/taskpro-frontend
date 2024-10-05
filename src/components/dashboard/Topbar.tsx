"use client";
import Link from "next/link";
import ThemeChanger from "../landing/DarkSwitch";
import Image from "next/image"
import { getDecodedToken } from "@/utils/authHelpers";
import { useEffect, useState } from "react";

export const Topbar = () => {
  const navigation = [
    "Product",
    "Features",
    "Pricing",
    "Company",
    "Blog",
  ];

  const [userName, setUserName] = useState("User");
  const user = getDecodedToken();

  useEffect(() => {
    if( user ) {
      setUserName(user.name);
    }
  }, [])
  

  return (
    <nav className="w-full relative flex flex-wrap items-center justify-between py-3 px-4 lg:px-6 xl:px-8 border-b">
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
      <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
        <ThemeChanger />
        <div className="hidden mr-3 lg:flex nav__item">
          <Link href="/" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            {userName}
          </Link>
        </div>
      </div>

      {/* menu  */}
      <div className="hidden text-center lg:flex lg:items-center">
        <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
          {navigation.map((menu, index) => (
            <li className="mr-3 nav__item" key={index}>
              <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                {menu}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  );
}

