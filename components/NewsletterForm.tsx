"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la lógica para enviar el email a tu backend
      setSubscribeStatus("¡Gracias por suscribirte!");
      setEmail("");
      setTimeout(() => setSubscribeStatus(null), 3000);
    }
  };

  return (
    <div className="mt-6">
      <h4 className="text-white text-base font-medium mb-3">Suscríbete a nuestro newsletter</h4>
      <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[#3d8eba]/30 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#00ffff]/60 transition-all"
            required
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bg-[#3d8eba]/20 hover:bg-[#00ffff]/20 text-white px-3 py-1 rounded text-sm transition-all"
          >
            Enviar
          </button>
        </div>
        {subscribeStatus && (
          <p className="text-[#00ffff] text-xs mt-1">{subscribeStatus}</p>
        )}
      </form>
    </div>
  );
}