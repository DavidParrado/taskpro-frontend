import { API_URL } from "@/utils/constants";

export const generateRandomTasks = async (
  data: { quantity: number; topicId: string; projectId: string },
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al generar las tareas");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Error de red o del servidor");
  }
};
