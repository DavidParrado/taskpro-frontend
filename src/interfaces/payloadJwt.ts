// Define el tipo para el payload del JWT (puedes personalizarlo según los datos que el backend envíe)
export interface IJwtPayload {
  id: string; // ID del usuario
  name: string; // Nombre del usuario
  email: string; // Email del usuario
  roles: string[]; // Roles del usuario
  iat: number; // Tiempo de emisión del token (timestamp)
  exp: number; // Tiempo de expiración del token (timestamp)
}
