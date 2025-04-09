import "../globals.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from '@/components/navbar';

export default async function protectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar si existe una sesión activa
  const session = await auth();

  // Si el usuario ya está autenticado, redirigir a la página principal
  if (!session) {
    redirect("/");
  }
  return (
    <html>
      <body>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
