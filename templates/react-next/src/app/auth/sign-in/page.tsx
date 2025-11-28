import { getAuth } from "@backend/utils/auth";
import { SignInForm } from "@frontend/features/auth/components/sign-in-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuth();

  if (auth) redirect("/");

  return <SignInForm />;
}
