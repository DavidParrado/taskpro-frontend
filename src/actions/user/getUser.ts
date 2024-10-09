import { API_URL } from "@/utils/constants";

export const getUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
