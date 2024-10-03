import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  console.log("Token:", token);
  // Si el token no existe, redirigir al login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si hay token, continuar con la solicitud
  return NextResponse.next();
}

// Proteger todas las rutas en /dashboard o cualquier otra ruta privada
export const config = {
  matcher: ["/dashboard","/"],
};
