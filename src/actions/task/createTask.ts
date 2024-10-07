import { API_URL } from "@/utils/constants";
import { TaskStatus } from "@/utils/enums";

export const createTask = async (
  task: {
    title: string;
    description?: string;
    dueDate?: Date;
    status: TaskStatus;
    tags?: string[];
    projectId: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear la tarea");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
