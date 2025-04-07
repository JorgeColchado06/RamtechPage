"use server";

import { signOut } from "@/lib/auth";

export async function signOutAction() {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}