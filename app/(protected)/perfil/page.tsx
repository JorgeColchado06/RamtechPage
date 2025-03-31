// app/(site)/perfil/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext'; // Ajusta la ruta si es necesario

// Tipos locales
type UserData = { nombre: string; apellido: string; email: string; telefono: string; direccion: string; fechaRegistro: string; };
type Compra = { id: number | string; fecha: string; plan: string; precio: string; estado: string; };

export default function Perfil() {
  const router = useRouter();
  const { profile: contextProfile, isLoadingAuth: isUserLoading, updateProfile, isAuthenticated } = useUser();

  // Estados locales
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tempData, setTempData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil");
  const [historialCompras, setHistorialCompras] = useState<Compra[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [localLoadingError, setLocalLoadingError] = useState<string | null>(null);

   // Redirigir si no está autenticado
   useEffect(() => {
     if (!isUserLoading && !isAuthenticated) {
       router.push('/login');
     }
   }, [isUserLoading, isAuthenticated, router]);


  // Cargar historial (simulado)
  const fetchPurchaseHistory = useCallback(async () => {
    setIsHistoryLoading(true); setLocalLoadingError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      const response = { ok: true, json: async () => [ { id: 1, fecha: "10/04/2023", plan: "Premium (API)", precio: "$49.99", estado: "Activo" }, { id: 2, fecha: "15/01/2023", plan: "Básico (API)", precio: "$19.99", estado: "Expirado" }, ]};
      // const response = await fetch('/api/user/purchases');
      if (!response.ok) throw new Error('Failed to fetch purchase history');
      setHistorialCompras(await response.json());
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      setLocalLoadingError(error instanceof Error ? error.message : "Error cargando historial");
      setHistorialCompras([]);
    } finally {
      setIsHistoryLoading(false);
    }
   }, []);

  // Cargar datos completos del perfil (simulado) - CON CATCH CORREGIDO
  const fetchFullUserData = useCallback(async (profile: typeof contextProfile) => {
      if (!profile) return;
      setLocalLoadingError(null);
      // Opcional: Indicar carga si esta operación fuera más larga
      // setIsLoadingSomeData(true);
      try { // --- INICIO TRY ---
          console.log("Fetching full user data (simulated)...");
          // --- SIMULACIÓN FETCH ---
          await new Promise(resolve => setTimeout(resolve, 50)); // Simular delay corto
          const fullData: UserData = {
            nombre: profile.nombre,
            apellido: profile.apellido,
            email: `usuario_${profile.nombre.toLowerCase()}@fetch.com`,
            telefono: "+34 111 222 333",
            direccion: "Calle Falsa 123, Ciudad API",
            fechaRegistro: "2024-01-01", // Esto vendría de la API
          };
          // --- FIN SIMULACIÓN ---
          setUserData(fullData);
          if (!editMode) {
              setTempData(fullData);
          }
          console.log("Full user data set.");
      // --- FIN TRY ---
      } catch (error) { // --- CATCH AÑADIDO ---
          console.error("Error fetching full user data:", error);
          setLocalLoadingError(error instanceof Error ? error.message : "Error cargando datos completos del perfil.");
      } finally {
           // Opcional: Quitar indicador de carga si se añadió
           // setIsLoadingSomeData(false);
      }
  // Dependencia editMode para re-sincronizar tempData si se cancela la edición
  }, [editMode]);

  // Efecto para cargar datos completos cuando el contexto está listo
  useEffect(() => { if (isAuthenticated && contextProfile) fetchFullUserData(contextProfile); }, [isAuthenticated, contextProfile, fetchFullUserData]);
  // Efecto para cargar historial al cambiar a la pestaña
  useEffect(() => { if (activeTab === "compras" && isAuthenticated) fetchPurchaseHistory(); }, [activeTab, isAuthenticated, fetchPurchaseHistory]);

  // Handlers (Input, Guardar, Cancelar, Exportar, Eliminar)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setTempData(prev => (prev ? { ...prev, [name]: value } : null)); };
  const handleSaveChanges = async () => { if (!tempData) return; setIsSaving(true); const success = await updateProfile({ nombre: tempData.nombre, apellido: tempData.apellido }); if (success) { const updatedFullData = { ...userData!, ...tempData }; setUserData(updatedFullData); setEditMode(false); alert("Perfil actualizado"); } else { alert("Error al actualizar"); } setIsSaving(false); };
  const handleCancelEdit = () => { setTempData(userData); setEditMode(false); };
  const handleExportData = async () => { setIsExporting(true); try { await new Promise(resolve => setTimeout(resolve, 1000)); const response = { ok: true, blob: async () => new Blob(["..."]) }; if (!response.ok) throw new Error('Failed export'); const blob = await response.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'datos.txt'; a.click(); window.URL.revokeObjectURL(url); a.remove(); alert("Exportación iniciada (simulado)."); } catch(error) { console.error(error); alert("Error exportando."); } finally { setIsExporting(false); } };
  const handleDeleteAccount = async () => { if (!window.confirm("SEGURO?") || !window.confirm("ULTIMA OPORTUNIDAD?")) return; setIsDeleting(true); try { await new Promise(resolve => setTimeout(resolve, 1500)); const response = { ok: true }; if (!response.ok) throw new Error('Failed delete'); alert("Cuenta eliminada (simulado)."); localStorage.clear(); router.push('/'); } catch(error) { console.error(error); alert("Error eliminando."); } finally { setIsDeleting(false); }};

  // Renderizado de carga o si no está autenticado
  if (isUserLoading || !isAuthenticated || !userData) {
    return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1a1a] to-[#162B3B]"><p className="text-white text-xl animate-pulse">Cargando...</p></div> );
  }

  // Calcular iniciales locales
  const localInitials = `${userData.nombre?.charAt(0)?.toUpperCase() || ''}${userData.apellido?.charAt(0)?.toUpperCase() || ''}`;

  return (
    // JSX con estructura y clases originales
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mi Perfil</h1>
         {/* Pestañas */}
         <div className="flex border-b border-gray-700 mb-8">
           <button className={`px-4 py-2 font-medium ${activeTab === "perfil" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`} onClick={() => setActiveTab("perfil")}>Datos Personales</button>
           <button className={`px-4 py-2 font-medium ${activeTab === "compras" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`} onClick={() => setActiveTab("compras")}>Historial de Compras</button>
           <button className={`px-4 py-2 font-medium ${activeTab === "cuenta" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`} onClick={() => setActiveTab("cuenta")}>Gestión de Cuenta</button>
         </div>

        {/* Mensaje de error local */}
        {localLoadingError && <div className="mb-4 p-4 text-center text-red-400 bg-red-900/30 border border-red-500 rounded-md">{localLoadingError}</div>}

        {/* Pestaña Datos Personales */}
        {activeTab === "perfil" && (
           <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white">Información Personal</h2>
               {!editMode ? ( <button onClick={() => { setTempData(userData); setEditMode(true); }} className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200 disabled:opacity-50" disabled={isSaving}>Editar Información</button>) : (
                 <div className="flex space-x-3">
                   <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50" disabled={isSaving}>Cancelar</button>
                   <button onClick={handleSaveChanges} className="px-4 py-2 bg-[#00ffff] text-[#0a1a1a] rounded-md hover:bg-[#00ffff]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button>
                 </div>
               )}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col">
                  <div className="flex items-center justify-center mb-6"><div className="w-32 h-32 bg-[#162B3B] rounded-full flex items-center justify-center text-white text-4xl font-medium">{localInitials || '??'}</div></div>
                  <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Miembro desde {userData.fechaRegistro}</p>
               </div>
               <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div> <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label> {editMode ? (<input type="text" name="nombre" value={tempData?.nombre || ''} onChange={handleInputChange} disabled={isSaving} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white disabled:opacity-70"/>) : (<p className="text-gray-800 dark:text-gray-200">{userData.nombre}</p>)} </div>
                   <div> <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label> {editMode ? (<input type="text" name="apellido" value={tempData?.apellido || ''} onChange={handleInputChange} disabled={isSaving} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white disabled:opacity-70"/>) : (<p className="text-gray-800 dark:text-gray-200">{userData.apellido}</p>)} </div>
                 </div>
                 <div> <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label> {editMode ? (<input type="email" name="email" value={tempData?.email || ''} onChange={handleInputChange} disabled={isSaving} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white disabled:opacity-70"/>) : (<p className="text-gray-800 dark:text-gray-200">{userData.email}</p>)} </div>
                 <div> <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label> {editMode ? (<input type="tel" name="telefono" value={tempData?.telefono || ''} onChange={handleInputChange} disabled={isSaving} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white disabled:opacity-70"/>) : (<p className="text-gray-800 dark:text-gray-200">{userData.telefono}</p>)} </div>
                 <div> <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección</label> {editMode ? (<input type="text" name="direccion" value={tempData?.direccion || ''} onChange={handleInputChange} disabled={isSaving} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white disabled:opacity-70"/>) : (<p className="text-gray-800 dark:text-gray-200">{userData.direccion}</p>)} </div>
               </div>
             </div>
           </div>
         )}
        {/* Pestaña Historial Compras */}
        {activeTab === "compras" && (
           <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Historial de Compras</h2>
             {isHistoryLoading ? (<p className="text-gray-600 dark:text-gray-400 text-center py-8 animate-pulse">Cargando historial...</p>)
              : historialCompras.length > 0 ? (
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead className="bg-gray-50 dark:bg-[#162B3B]"><tr><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th></tr></thead><tbody className="bg-white dark:bg-[#0a1a1a] divide-y divide-gray-200 dark:divide-gray-700">{historialCompras.map((compra) => ( <tr key={compra.id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{compra.fecha}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{compra.plan}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{compra.precio}</td><td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado === 'Activo' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>{compra.estado}</span></td></tr> ))}</tbody></table>
               </div>
             ) : (<p className="text-gray-600 dark:text-gray-400 text-center py-8">No tienes compras registradas.</p>)}
           </div>
         )}
        {/* Pestaña Gestión Cuenta */}
        {activeTab === "cuenta" && (
           <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Gestión de Cuenta</h2>
             <div className="space-y-6">
               <div><h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Información de Cuenta</h3><p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Fecha de registro: {userData.fechaRegistro}</p><button className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200 mr-3" onClick={() => router.push('/configuracion')}>Ir a Configuración</button></div>
               <div><h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Exportar Datos</h3><p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Descarga una copia de tus datos personales y actividad.</p><button className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200 disabled:opacity-50" onClick={handleExportData} disabled={isExporting}>{isExporting ? 'Exportando...' : 'Exportar mis datos'}</button></div>
               <div><h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Eliminar Cuenta</h3><p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Al eliminar tu cuenta, perderás acceso a todos tus datos y servicios.</p><button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50" onClick={handleDeleteAccount} disabled={isDeleting}>{isDeleting ? 'Eliminando...' : 'Eliminar mi cuenta'}</button></div>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}