import { Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/frontend/lib/auth";

export default function Header() {
  const session = authClient.useSession();
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <nav>
          <Link to="/" activeOptions={{ exact: true }} className="" activeProps={{ className: "" }}>
            Home
          </Link>
          <Link to="/todos" className="" activeProps={{ className: "" }}>
            Todos
          </Link>
          <Link to="/chat" className="" activeProps={{ className: "" }}>
            Chat
          </Link>
          {session.data?.user ? (
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut();
                navigate({ to: "/" });
              }}
              className=""
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth/sign-in" className="" activeProps={{ className: "" }}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
