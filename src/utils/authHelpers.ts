// utils/authHelpers.ts
import * as jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';
import { IJwtPayload } from "@/interfaces/payloadJwt";

// Extract payload data from token (return null if invalid)
export const getDecodedToken = () => {
  const token = getToken(); // Get token from cookies
  if (!token) return null;
  try {
    const decoded = jwtDecode.jwtDecode<IJwtPayload>(token); // Decode token
    return decoded; // Return decoded token
  } catch (err) {
    console.log(err);
    return null; // Invalid token
  }
};

// Set token to cookies
export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 }); // Save token to cookies
};

// Extract token from cookies
export const getToken = () => {
  return Cookies.get("token");
};

// Remove token from cookies
export const removeToken = () => {
  Cookies.remove("token");
};