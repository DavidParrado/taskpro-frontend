import { API_URL } from "@/utils/constants";

export const getTeamsByUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/teams/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los equipos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error de red o servidor");
  }
};
