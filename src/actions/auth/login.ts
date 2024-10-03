const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// Función para iniciar sesión
export const login = async (formData: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error de red o del servidor");
  }
};
