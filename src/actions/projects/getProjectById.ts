import { API_URL } from "@/utils/constants";

export const getProjectById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener el proyecto");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
