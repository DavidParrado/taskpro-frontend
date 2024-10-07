import { TaskFormInputs } from "@/components";
import { ITask } from "@/interfaces";
import { API_URL } from "@/utils/constants";

export const updateTask = async (taskId: string, task: TaskFormInputs, token: string) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error("An error occurred while updating the task");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
