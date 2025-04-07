'use client';

import { create } from 'zustand';
import { User, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface UserFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  image?: string;
}

interface UserUpdateData extends Partial<UserFormData> {
  id: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
  
  // Acciones
  fetchUsers: () => Promise<void>;
  getUserById: (id: string) => Promise<User | null>;
  createUser: (userData: UserFormData) => Promise<boolean>;
  updateUser: (userData: UserUpdateData) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  clearMessages: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  success: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
      set({ users, isLoading: false });
      return;
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al obtener usuarios', 
        isLoading: false 
      });
    }
  },

  getUserById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      });
      set({ isLoading: false });
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al obtener el usuario', 
        isLoading: false 
      });
      return null;
    }
  },

  createUser: async (userData: UserFormData) => {
    set({ isLoading: true, error: null, success: null });
    try {
      // Verificar si el correo ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        set({ 
          error: 'El correo electrónico ya está registrado', 
          isLoading: false 
        });
        return false;
      }

      // Crear el usuario
      const newUser = await prisma.user.create({
        data: userData
      });

      // Actualizar la lista de usuarios
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });

      set({ 
        users, 
        isLoading: false, 
        success: 'Usuario creado exitosamente' 
      });
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        set({ success: null });
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al crear el usuario', 
        isLoading: false 
      });
      return false;
    }
  },

  updateUser: async (userData: UserUpdateData) => {
    set({ isLoading: true, error: null, success: null });
    try {
      // Verificar si el usuario existe
      const existingUser = await prisma.user.findUnique({
        where: { id: userData.id }
      });

      if (!existingUser) {
        set({ 
          error: 'Usuario no encontrado', 
          isLoading: false 
        });
        return false;
      }

      // Si se está actualizando el email, verificar que no exista otro usuario con ese email
      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email: userData.email }
        });

        if (emailExists) {
          set({ 
            error: 'El correo electrónico ya está registrado por otro usuario', 
            isLoading: false 
          });
          return false;
        }
      }

      // Actualizar el usuario
      const { id, ...updateData } = userData;
      await prisma.user.update({
        where: { id },
        data: updateData
      });

      // Actualizar la lista de usuarios
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });

      set({ 
        users, 
        isLoading: false, 
        success: 'Usuario actualizado exitosamente' 
      });
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        set({ success: null });
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar el usuario', 
        isLoading: false 
      });
      return false;
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null, success: null });
    try {
      // Verificar si el usuario existe
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        set({ 
          error: 'Usuario no encontrado', 
          isLoading: false 
        });
        return false;
      }

      // Eliminar el usuario
      await prisma.user.delete({
        where: { id }
      });

      // Actualizar la lista de usuarios
      const users = get().users.filter(user => user.id !== id);

      set({ 
        users, 
        isLoading: false, 
        success: 'Usuario eliminado exitosamente' 
      });
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        set({ success: null });
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar el usuario', 
        isLoading: false 
      });
      return false;
    }
  },

  clearMessages: () => {
    set({ error: null, success: null });
  }
}));