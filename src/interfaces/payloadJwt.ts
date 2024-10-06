import { IUser } from "./user";

// Define el tipo para el payload del JWT (puedes personalizarlo según los datos que el backend envíe)
export interface IJwtPayload {
  user: IUser; // Datos del usuario
  iat: number; // Tiempo de emisión del token (timestamp)
  exp: number; // Tiempo de expiración del token (timestamp)
}
