// src/context/UserContext.tsx
"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';

// Tipos
export type UserProfile = {
  nombre: string;
  apellido: string;
};

export type UserContextType = {
  profile: UserProfile | null;
  initials: string;
  authToken: string | null; // Aún útil para llamadas API autenticadas
  isAuthenticated: boolean; // Estado derivado de la presencia/validez del token/perfil
  isLoadingAuth: boolean; // Para saber si la verificación inicial está en curso
  logout: () => void;
  updateProfile: (newProfileData: UserProfile) => Promise<boolean>;
};

// Contexto
const UserContext = createContext<UserContextType>({
  profile: null,
  initials: "??",
  authToken: null,
  isAuthenticated: false,
  isLoadingAuth: true, // Inicia true para verificar token
  logout: () => {},
  updateProfile: async () => false,
});

export const useUser = () => useContext(UserContext);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  // --- Logout ---
  const logout = useCallback(() => {
    setAuthToken(null); setProfile(null); setIsAuthenticated(false);
    localStorage.removeItem('authToken'); localStorage.removeItem('userProfile');
    console.log("Logged out (context)");
    // Considerar redirección forzada si es necesario, aunque mejor en el componente
    // window.location.href = '/login';
  }, []);

  // --- Cargar Perfil si hay Token ---
  const loadUserProfile = useCallback(async (token: string) => {
    if (!token) { setIsLoadingAuth(false); return; }
    setIsLoadingAuth(true); // Indicar carga durante la verificación
    try {
      // --- SIMULACIÓN API (GET /api/user/profile) ---
      console.log("Verifying token and loading profile...");
      await new Promise(resolve => setTimeout(resolve, 400));
      let response: Response;
      if (token === "fake-jwt-token-12345") { // Asume este es un token válido
         response = new Response(JSON.stringify({ nombre: "Usuario", apellido: "Contexto" }), { status: 200 });
      } else {
         response = new Response(JSON.stringify({ message: "Token inválido" }), { status: 401 });
      }
      // const response = await fetch('/api/user/profile', { headers: { 'Authorization': `Bearer ${token}` } }); // EJEMPLO REAL
      // --- FIN SIMULACIÓN ---

      if (!response.ok) throw new Error((await response.json()).message || 'Token inválido');

      const data: UserProfile = await response.json();
      setProfile(data);
      localStorage.setItem('userProfile', JSON.stringify(data)); // Guardar perfil
      setIsAuthenticated(true); // <<< Autenticado SI el perfil carga bien

    } catch (error) {
      console.error("Token verification/Profile load error:", error);
      logout(); // Desloguear si el token no sirve
    } finally {
      setIsLoadingAuth(false); // <<< Terminar carga SIEMPRE
    }
  }, [logout]);

  // --- Carga Inicial (Solo al montar) ---
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      loadUserProfile(storedToken); // Intenta cargar perfil con el token encontrado
    } else {
      setIsLoadingAuth(false); // No hay token, terminar carga inicial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Vacío para ejecutar solo al montar

  // --- Update Profile ---
  const updateProfile = useCallback(async (newProfileData: UserProfile): Promise<boolean> => {
      if (!authToken || !isAuthenticated) return false; // Necesita estar autenticado
     console.log("Context: Updating profile...");
     try {
        // --- SIMULACIÓN API (PUT /api/user/profile) ---
        await new Promise(resolve => setTimeout(resolve, 500));
        let response = new Response(JSON.stringify(newProfileData), { status: 200 });
        // const response = await fetch('/api/user/profile', { method: 'PUT', headers:{ Authorization:... }, body:... }); // EJEMPLO REAL
        // --- FIN SIMULACIÓN ---
        if (!response.ok) throw new Error('Error actualizando');
        const updatedProfile: UserProfile = await response.json();
        setProfile(updatedProfile); localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        return true;
     } catch (error) {
       console.error("Context profile update error:", error); return false;
     }
   }, [authToken, isAuthenticated]);

  // Calcular iniciales
   const initials = useMemo(() => {
       if (!profile) return "??";
       const first = profile.nombre?.charAt(0)?.toUpperCase() || '';
       const last = profile.apellido?.charAt(0)?.toUpperCase() || '';
       return `${first}${last}` || "??";
   }, [profile]);

  // Valor del contexto
  const value = { profile, initials, authToken, isAuthenticated, isLoadingAuth, logout, updateProfile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}