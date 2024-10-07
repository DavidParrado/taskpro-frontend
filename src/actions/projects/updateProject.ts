import { API_URL } from "@/utils/constants";
import { ProjectStatus } from "@/utils/enums";
// Update Project
export const updateProject = async (
  projectId: string,
  project: {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status: ProjectStatus;
  },
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el proyecto");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
