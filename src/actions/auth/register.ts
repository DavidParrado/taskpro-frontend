const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const registerUser = async (formData: {
  name: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el registro");
    }

    return await response.json(); // Retornamos la respuesta si fue exitosa
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error de red o del servidor");
  }
};
