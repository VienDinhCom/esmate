import { getAuth } from "@backend/utils/auth";

export default async function Page() {
  const auth = await getAuth();

  return <div>{auth?.name}</div>;
}
