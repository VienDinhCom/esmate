import { getAuthUser } from "@/lib/services/auth";
import { Header } from "./header";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();

  return (
    <section className="flex min-h-screen flex-col">
      <Header user={user} />
      {children}
    </section>
  );
}
