import { API_URL } from "@/utils/constants";

export const createTeam = async (team: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(team),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el equipo");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error de red o servidor");
  }
};
