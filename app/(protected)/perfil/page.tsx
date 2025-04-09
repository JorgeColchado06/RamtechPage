"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";

export default function Perfil() {
  const router = useRouter();
  
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: "Juan Carlos",
    apellido: "Ramírez",
    email: "juancarlos@example.com",
    telefono: "+34 612 345 678",
    direccion: "Calle Principal 123, Madrid",
    fechaRegistro: "15/01/2023",
  });

  // Estado para el modo de edición
  const [editMode, setEditMode] = useState(false);
  
  // Estado para almacenar los datos temporales durante la edición
  const [tempData, setTempData] = useState({...userData});

  // Estado para las pestañas
  const [activeTab, setActiveTab] = useState("perfil");

  // Historial de compras simulado
  const historialCompras = [
    { id: 1, fecha: "10/04/2023", plan: "Plan Premium", precio: "$49.99", estado: "Activo" },
    { id: 2, fecha: "15/01/2023", plan: "Plan Básico", precio: "$19.99", estado: "Expirado" },
  ];

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  // Función para guardar los cambios
  const handleSaveChanges = () => {
    setUserData(tempData);
    setEditMode(false);
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setTempData({...userData});
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mi Perfil</h1>
        
        {/* Pestañas de navegación */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "perfil" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("perfil")}
          >
            Datos Personales
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "compras" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("compras")}
          >
            Historial de Compras
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "cuenta" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("cuenta")}
          >
            Gestión de Cuenta
          </button>
        </div>

        {/* Contenido de la pestaña de Información Personal */}
        {activeTab === "perfil" && (
          <div className="bg-white/5 backdrop-blur-md border border-[#00ffff]/20 p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Información Personal
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/20 hover:scale-105 transition-all duration-300"
                >
                  Editar Información
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="cursor-pointer bg-white/10 border border-gray-600/30 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/20 hover:scale-105 transition-all duration-300"
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-[#224e6a] to-[#3d8eba] border-2 border-[#00ffff]/30 rounded-full flex items-center justify-center text-white text-4xl font-medium shadow-lg">
                    {userData.nombre.charAt(0)}{userData.apellido.charAt(0)}
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                  Miembro desde {userData.fechaRegistro}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {editMode ? (
                      <Input
                        type="text"
                        name="nombre"
                        label="Nombre"
                        value={tempData.nombre}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nombre
                        </label>
                        <p className="text-gray-800 dark:text-gray-200">{userData.nombre}</p>
                      </>
                    )}
                  </div>
                  <div>
                    {editMode ? (
                      <Input
                        type="text"
                        name="apellido"
                        label="Apellido"
                        value={tempData.apellido}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Apellido
                        </label>
                        <p className="text-gray-800 dark:text-gray-200">{userData.apellido}</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {editMode ? (
                    <Input
                      type="email"
                      name="email"
                      label="Correo Electrónico"
                      value={tempData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo Electrónico
                      </label>
                      <p className="text-gray-800 dark:text-gray-200">{userData.email}</p>
                    </>
                  )}
                </div>

                <div>
                  {editMode ? (
                    <Input
                      type="tel"
                      name="telefono"
                      label="Teléfono"
                      value={tempData.telefono}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Teléfono
                      </label>
                      <p className="text-gray-800 dark:text-gray-200">{userData.telefono}</p>
                    </>
                  )}
                </div>

                <div>
                  {editMode ? (
                    <Input
                      type="text"
                      name="direccion"
                      label="Dirección"
                      value={tempData.direccion}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dirección
                      </label>
                      <p className="text-gray-800 dark:text-gray-200">{userData.direccion}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña de Historial de Compras */}
        {activeTab === "compras" && (
          <div className="bg-white/5 backdrop-blur-md border border-[#00ffff]/20 p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Historial de Compras
            </h2>
            
            {historialCompras.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-[#162B3B] to-[#224e6a] border-b border-[#00ffff]/20">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Precio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent divide-y divide-[#00ffff]/10">
                    {historialCompras.map((compra) => (
                      <tr key={compra.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {compra.fecha}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {compra.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {compra.precio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado === 'Activo' ? 'bg-green-100/20 text-green-400 border border-green-400/30' : 'bg-red-100/20 text-red-400 border border-red-400/30'}`}>
                            {compra.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No tienes compras registradas.
              </p>
            )}
          </div>
        )}

        {/* Contenido de la pestaña de Gestión de Cuenta */}
        {activeTab === "cuenta" && (
          <div className="bg-white/5 backdrop-blur-md border border-[#00ffff]/20 p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Gestión de Cuenta
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Información de Cuenta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Fecha de registro: {userData.fechaRegistro}
                </p>
                <button
                  className="cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/20 hover:scale-105 transition-all duration-300 mr-3"
                  onClick={() => router.push('/configuracion')}
                >
                  Ir a Configuración
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Exportar Datos
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Descarga una copia de tus datos personales y actividad en la plataforma.
                </p>
                <button
                  className="cursor-pointer bg-gradient-to-r from-[#224e6a] to-[#00ffff]/50 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-[#00ffff]/20 hover:scale-105 transition-all duration-300"
                  onClick={() => alert("Funcionalidad para exportar datos")}
                >
                  Exportar mis datos
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Eliminar Cuenta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Al eliminar tu cuenta, perderás acceso a todos tus datos y servicios contratados.
                </p>
                <button
                  className="cursor-pointer bg-gradient-to-r from-red-600/80 to-red-700/80 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-red-500/20 hover:scale-105 transition-all duration-300"
                  onClick={() => alert("Funcionalidad para eliminar cuenta")}
                >
                  Eliminar mi cuenta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}