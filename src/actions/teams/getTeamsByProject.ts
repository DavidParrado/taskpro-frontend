import { API_URL } from "@/utils/constants";

export const getTeamsByProject = async (projectId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/teams/project${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
