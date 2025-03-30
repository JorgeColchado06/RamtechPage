"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Información Personal
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                >
                  Editar Información
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-[#00ffff] text-[#0a1a1a] rounded-md hover:bg-[#00ffff]/80 transition-colors duration-200"
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 bg-[#162B3B] rounded-full flex items-center justify-center text-white text-4xl font-medium">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="nombre"
                        value={tempData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200">{userData.nombre}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Apellido
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="apellido"
                        value={tempData.apellido}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200">{userData.apellido}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Correo Electrónico
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="telefono"
                      value={tempData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{userData.telefono}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dirección
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="direccion"
                      value={tempData.direccion}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{userData.direccion}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña de Historial de Compras */}
        {activeTab === "compras" && (
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Historial de Compras
            </h2>
            
            {historialCompras.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#162B3B]">
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
                  <tbody className="bg-white dark:bg-[#0a1a1a] divide-y divide-gray-200 dark:divide-gray-700">
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
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
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200 mr-3"
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
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
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
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
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