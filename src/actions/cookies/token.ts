"use server";

import { cookies } from "next/headers";

export async function createTokenCookie(value: string) {
  if (value === "") return;
  cookies().set({
    name: "token",
    value: value,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}
