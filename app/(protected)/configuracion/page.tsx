"use client";
import { useState } from "react";

export default function Configuracion() {
  
  // Estado para las configuraciones del usuario
  const [configData, setConfigData] = useState({
    idioma: "Español",
    tema: "Oscuro",
    notificaciones: {
      email: true,
      promociones: true,
      actualizaciones: true,
    },
    privacidad: {
      perfilPublico: false,
      mostrarActividad: true,
      compartirDatos: false,
    },
    seguridad: {
      autenticacionDosFactores: false,
      sesionesActivas: 1,
    }
  });

  // Estado para el modo de edición
  const [editMode, setEditMode] = useState(false);
  
  // Estado para almacenar los datos temporales durante la edición
  const [tempData, setTempData] = useState({...configData});

  // Estado para las pestañas
  const [activeTab, setActiveTab] = useState("general");

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  // Función para manejar cambios en los checkboxes de notificaciones
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempData({
      ...tempData,
      notificaciones: {
        ...tempData.notificaciones,
        [name]: checked,
      },
    });
  };

  // Función para manejar cambios en los checkboxes de privacidad
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempData({
      ...tempData,
      privacidad: {
        ...tempData.privacidad,
        [name]: checked,
      },
    });
  };

  // Función para manejar cambios en los checkboxes de seguridad
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempData({
      ...tempData,
      seguridad: {
        ...tempData.seguridad,
        [name]: checked,
      },
    });
  };

  // Función para guardar los cambios
  const handleSaveChanges = () => {
    setConfigData(tempData);
    setEditMode(false);
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setTempData({...configData});
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a1a] to-[#162B3B] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Configuración</h1>
        
        {/* Pestañas de navegación */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "general" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "notificaciones" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("notificaciones")}
          >
            Notificaciones
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "privacidad" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("privacidad")}
          >
            Privacidad
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "seguridad" ? "text-[#00ffff] border-b-2 border-[#00ffff]" : "text-gray-400 hover:text-white"}`}
            onClick={() => setActiveTab("seguridad")}
          >
            Seguridad
          </button>
        </div>

        {/* Contenido de la pestaña General */}
        {activeTab === "general" && (
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración General
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                >
                  Editar Configuración
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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Preferencias de Idioma
                </h3>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Idioma
                  </label>
                  {editMode ? (
                    <select
                      name="idioma"
                      value={tempData.idioma}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                    >
                      <option value="Español">Español</option>
                      <option value="English">English</option>
                      <option value="Français">Français</option>
                      <option value="Deutsch">Deutsch</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{configData.idioma}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Apariencia
                </h3>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tema
                  </label>
                  {editMode ? (
                    <select
                      name="tema"
                      value={tempData.tema}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#00ffff] focus:border-[#00ffff] dark:bg-[#162B3B] dark:text-white"
                    >
                      <option value="Claro">Claro</option>
                      <option value="Oscuro">Oscuro</option>
                      <option value="Sistema">Usar configuración del sistema</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{configData.tema}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña de Notificaciones */}
        {activeTab === "notificaciones" && (
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración de Notificaciones
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                >
                  Editar Configuración
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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Preferencias de Notificaciones
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="email-notif"
                      name="email"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.notificaciones.email : configData.notificaciones.email}
                      onChange={handleNotificationChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="email-notif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Recibir notificaciones por correo electrónico
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="promo-notif"
                      name="promociones"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.notificaciones.promociones : configData.notificaciones.promociones}
                      onChange={handleNotificationChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="promo-notif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Recibir ofertas y promociones
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="updates-notif"
                      name="actualizaciones"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.notificaciones.actualizaciones : configData.notificaciones.actualizaciones}
                      onChange={handleNotificationChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="updates-notif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Recibir actualizaciones del sistema
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña de Privacidad */}
        {activeTab === "privacidad" && (
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración de Privacidad
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                >
                  Editar Configuración
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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Opciones de Privacidad
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="public-profile"
                      name="perfilPublico"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.privacidad.perfilPublico : configData.privacidad.perfilPublico}
                      onChange={handlePrivacyChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="public-profile" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Hacer mi perfil público
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="show-activity"
                      name="mostrarActividad"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.privacidad.mostrarActividad : configData.privacidad.mostrarActividad}
                      onChange={handlePrivacyChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="show-activity" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Mostrar mi actividad a otros usuarios
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="share-data"
                      name="compartirDatos"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.privacidad.compartirDatos : configData.privacidad.compartirDatos}
                      onChange={handlePrivacyChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="share-data" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Compartir datos de uso para mejorar el servicio
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Gestión de Datos
                </h3>
                <button
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                  onClick={() => alert("Funcionalidad para descargar datos")}
                >
                  Descargar mis datos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña de Seguridad */}
        {activeTab === "seguridad" && (
          <div className="bg-white dark:bg-[#0a1a1a] p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración de Seguridad
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                >
                  Editar Configuración
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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Autenticación
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="two-factor"
                      name="autenticacionDosFactores"
                      type="checkbox"
                      className="h-4 w-4 text-[#00ffff] focus:ring-[#00ffff] border-gray-300 rounded"
                      checked={editMode ? tempData.seguridad.autenticacionDosFactores : configData.seguridad.autenticacionDosFactores}
                      onChange={handleSecurityChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Activar autenticación de dos factores
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Contraseña
                </h3>
                <button
                  className="px-4 py-2 bg-[#162B3B] text-white rounded-md hover:bg-[#3d8eba] transition-colors duration-200"
                  onClick={() => alert("Funcionalidad para cambiar contraseña")}
                >
                  Cambiar Contraseña
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Sesiones Activas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Actualmente tienes {configData.seguridad.sesionesActivas} sesión activa.
                </p>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  onClick={() => alert("Funcionalidad para cerrar todas las sesiones")}
                >
                  Cerrar todas las sesiones
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}