import { API_URL } from "@/utils/constants";

export const deleteProject = async (projectId: string, token: string) => {
  const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while deleting the project");
  }

  return response.json();
};
