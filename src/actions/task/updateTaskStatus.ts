import { API_URL } from "@/utils/constants";

export const updateTaskStatus = async (
  taskId: string,
  status: string,
  token: string
) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error("An error occurred while updating the task status");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
