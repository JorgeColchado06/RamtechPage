import React from "react";

interface StatusMessageProps {
  success: string;
  error: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ success, error }) => {
  if (!success && !error) return null;
  
  return (
    <>
      {/* Mensaje de éxito */}
      {success && (
        <div className="mb-4 text-sm text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-lg p-3 text-center">
          {success}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
          {error}
        </div>
      )}
    </>
  );
};

export default StatusMessage;