// utils/authHelpers.ts
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';

// Define el tipo para el payload del JWT (puedes personalizarlo según los datos que el backend envíe)
interface JwtPayload {
  id: string;
  name: string;
  email: string;
  exp: number; // Tiempo de expiración del token (timestamp)
}


// Replace with your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Extract user data from token (return null if invalid)
export const getUserFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode and verify token
    return decoded; // The decoded user data (like id, email)
  } catch (err) {
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