import { API_URL } from "@/utils/constants";

export const updateTeam = async (teamId: string, teamData: any, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/teams/${teamId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el equipo");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error de red o servidor");
  }
}