import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jwtDecode from "jwt-decode";
import { IJwtPayload } from "./interfaces/payloadJwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  // Si el token no existe, redirigir al login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Decodificar el token
  const decodedToken = jwtDecode.jwtDecode<IJwtPayload>(token.value); // Decode token
  if (!decodedToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Obtener la fecha de expiración del token
  const expireDate = new Date(decodedToken.exp * 1000);
  if (expireDate < new Date()) {
    console.log("Token expirado");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si hay token, continuar con la solicitud
  return NextResponse.next();
}

// Proteger todas las rutas en /dashboard o cualquier otra ruta privada
export const config = {
  matcher: ["/", "/projects/:id*", "/teams/:id*", "/tasks/:id*"],
};
