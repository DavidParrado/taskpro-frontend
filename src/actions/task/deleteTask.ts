import { API_URL } from "@/utils/constants";

export const deleteTask = async (taskId: string, token: string) => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while deleting the task");
  }

  return response.json();
};
