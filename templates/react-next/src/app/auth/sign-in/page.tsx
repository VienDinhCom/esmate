import { getAuth } from "@/lib/auth";
import { SignInForm } from "@/app/auth/sign-in/sign-in-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuth();

  if (auth) redirect("/");

  return <SignInForm />;
}
