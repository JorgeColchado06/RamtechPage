"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Form from "next/form";
import bcrypt from "bcryptjs";
import Input from "@/components/ui/Input";
import EditUserModal from "@/components/admin/EditUserModal";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export default async function AdminPage() {
  const users = await prisma.user.findMany();

  async function createUser(formData: FormData) {
    "use server";

    try {
      const name = formData.get("name") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const role = formData.get("role") as "CLIENT" | "ADMIN";

      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("El correo electrónico ya está registrado");
      }

      // Hashear la contraseña con bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          lastName,
          email,
          password: hashedPassword,
          role,
        },
      });

      revalidatePath("/administrador");
      redirect("/administrador");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }
  
  async function updateUser(formData: FormData) {
    "use server";
    
    try {
      const id = formData.get("id") as string;
      const name = formData.get("name") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const role = formData.get("role") as "CLIENT" | "ADMIN";
      const password = formData.get("password") as string;
      
      // Verificar si el usuario existe
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }
      
      // Verificar si el email ya está en uso por otro usuario
      if (email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email },
        });
        
        if (emailExists) {
          throw new Error("El correo electrónico ya está registrado por otro usuario");
        }
      }
      
      // Preparar datos para actualizar
      const updateData: any = {
        name,
        lastName,
        email,
        role,
      };
      
      // Si se proporciona una nueva contraseña, hashearla
      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }
      
      // Actualizar usuario
      await prisma.user.update({
        where: { id },
        data: updateData,
      });
      
      revalidatePath("/administrador");
      redirect("/administrador");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }
  
  async function deleteUser(formData: FormData) {
    "use server";
    
    try {
      const id = formData.get("id") as string;
      
      // Verificar si el usuario existe
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }
      
      // Eliminar usuario
      await prisma.user.delete({
        where: { id },
      });
      
      revalidatePath("/administrador");
      redirect("/administrador");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] py-12">
      <div className="max-w-4xl mx-auto p-8 bg-white/5 rounded-lg border border-[#00ffff]/20 shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-white text-center bg-clip-text bg-gradient-to-r from-[#3d8eba] to-[#00ffff]">
          Administrar Usuarios
        </h1>

        <Form action={createUser} className="space-y-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              required
              containerClassName="m-0"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Apellido"
              required
              containerClassName="m-0"
            />
          </div>
          <Input type="email" name="email" placeholder="Correo" required />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            showPasswordToggle
          />
          <select
            name="role"
            className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200"
            required
          >
            <option value="CLIENT">Cliente</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#224e6a]/80 to-[#3d8eba]/80 border border-[#00ffff]/30 px-8 py-3 rounded-lg text-white font-medium hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              Crear Usuario
            </button>
          </div>
        </Form>

        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Usuarios Registrados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/5 p-5 rounded-lg border border-[#00ffff]/20 hover:border-[#00ffff]/40 transition-all duration-300"
            >
              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-white">Nombre:</span>{" "}
                {user.name} {user.lastName}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-white">Email:</span>{" "}
                {user.email}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-white">Rol:</span>{" "}
                {user.role === "ADMIN" ? "Administrador" : "Cliente"}
              </p>
              
              <div className="flex justify-end space-x-2 mt-3">
                {/* Componentes de cliente para edición y eliminación */}
                <EditUserModal user={user} updateUserAction={updateUser} />
                <DeleteUserButton userId={user.id} deleteUserAction={deleteUser} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
