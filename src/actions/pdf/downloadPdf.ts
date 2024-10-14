import { API_URL } from "@/utils/constants";

export const downloadPdf = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/pdf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to download pdf");
    }

    return await response.blob();
  } catch (err) {
    console.error(err);
  }
};
