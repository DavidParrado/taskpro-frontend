export const getProjectsByUser = async (userId: string, token: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${API_URL}/api/projects/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los proyectos");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
