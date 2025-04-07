"use client";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import Input from "@/components/ui/Input";
import { FaEdit } from "react-icons/fa";
import Form from "next/form";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

interface EditUserModalProps {
  user: User;
  updateUserAction: (formData: FormData) => Promise<void>;
}

export default function EditUserModal({ user, updateUserAction }: EditUserModalProps) {
  return (
    <Modal>
      <ModalTrigger className="p-2 bg-[#224e6a]/80 rounded-lg text-white hover:bg-[#3d8eba]/80 transition-all duration-200">
        <FaEdit />
      </ModalTrigger>
      
      <ModalBody className="w-full max-w-md mx-auto">
        <ModalContent>
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3d8eba] to-[#00ffff]">
            Editar Usuario
          </h2>
          
          <Form action={updateUserAction} className="space-y-4">
            <input type="hidden" name="id" value={user.id} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                defaultValue={user.name}
                containerClassName="m-0"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Apellido"
                required
                defaultValue={user.lastName}
                containerClassName="m-0"
              />
            </div>
            
            <Input 
              type="email" 
              name="email" 
              placeholder="Correo" 
              required 
              defaultValue={user.email}
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Nueva contraseña (dejar vacío para mantener la actual)"
              showPasswordToggle
            />
            
            <select
              name="role"
              className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff]/40 transition-all duration-200"
              required
              defaultValue={user.role}
            >
              <option value="CLIENT">Cliente</option>
              <option value="ADMIN">Administrador</option>
            </select>
            
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#224e6a]/80 to-[#3d8eba]/80 border border-[#00ffff]/30 px-8 py-3 rounded-lg text-white font-medium hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                Guardar Cambios
              </button>
            </div>
          </Form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}