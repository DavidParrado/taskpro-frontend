import { API_URL } from "@/utils/constants";

export const updateUser = async (userId: any, data: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el usuario");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error de red o servidor");
  }
};