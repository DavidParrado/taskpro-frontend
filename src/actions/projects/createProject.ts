import { ProjectStatus } from "@/utils/enums";

export const createProject = async (project: {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus;
}, token: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el proyecto");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
