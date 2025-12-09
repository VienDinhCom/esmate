import { getAuth } from "@/lib/auth";
import { Header } from "./header";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const auth = await getAuth();

  return (
    <section className="flex min-h-screen flex-col">
      <Header user={auth} />
      {children}
    </section>
  );
}
