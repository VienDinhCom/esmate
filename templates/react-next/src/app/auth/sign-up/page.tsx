import { getAuth } from "@/lib/auth";
import { SignUpForm } from "@/app/auth/sign-up/sign-up-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuth();

  if (auth) redirect("/");

  return <SignUpForm />;
}
