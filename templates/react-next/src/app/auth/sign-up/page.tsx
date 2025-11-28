import { getAuth } from "@backend/utils/auth";
import { SignUpForm } from "@frontend/features/auth/components/sign-up-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuth();

  if (auth) redirect("/");

  return <SignUpForm />;
}
