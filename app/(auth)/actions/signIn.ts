"use server";

import { signIn } from "@/lib/auth";

export async function loginWithCredentials(formData: FormData) {
  try {
    // Modificamos la llamada a signIn para que no redirija automáticamente
    // y para que no lance error en caso de éxito
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    console.log(error)
    return { success: false, error: "Credenciales inválidas" };
  }
}