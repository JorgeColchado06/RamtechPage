"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerWithCredentials(formData: FormData) {
  try {
    // Extraer datos del formulario
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "El correo electrónico ya está registrado" };
    }

    // Hashear la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con la contraseña hasheada
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastName,
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { success: false, error: "Error al crear la cuenta" };
  }
}