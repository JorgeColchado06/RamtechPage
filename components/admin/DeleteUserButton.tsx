"use client";
import { FaTrash } from "react-icons/fa";
import Form from "next/form";

interface DeleteUserButtonProps {
  userId: string;
  deleteUserAction: (formData: FormData) => Promise<void>;
}

export default function DeleteUserButton({ userId, deleteUserAction }: DeleteUserButtonProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      e.preventDefault();
    }
  };

  return (
    <Form action={deleteUserAction}>
      <input type="hidden" name="id" value={userId} />
      <button
        type="submit"
        className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600/80 transition-all duration-200"
        onClick={handleDelete}
      >
        <FaTrash />
      </button>
    </Form>
  );
}