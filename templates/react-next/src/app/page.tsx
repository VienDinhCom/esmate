import { getAuth } from "@/lib/auth";

export default async function Page() {
  const auth = await getAuth();

  return <div>{auth?.name}</div>;
}
