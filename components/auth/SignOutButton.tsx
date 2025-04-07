
import { signOutAction } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";

export function SignOutButton() {

  const redirectTo = () => redirect("/login")
    
  return (
    <form action={async () => {
      await signOutAction();
    }}>
      <button type="submit" onClick={redirectTo} className="w-full text-left cursor-pointer">Cerrar Sesión</button>
    </form>
  );
}