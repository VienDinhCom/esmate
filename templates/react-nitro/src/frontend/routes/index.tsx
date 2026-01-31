import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
import { ExternalLink } from "@esmate/shadcn/pkgs/lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "@/frontend/assets/images/logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <Card>
        <CardContent>
          <div>
            <img src={logo} alt="logo" />

            <div>
              <h1>ESMate React Nitro</h1>
              <p>
                Edit <code>src/frontend/routes/index.tsx</code> and save to reload.
              </p>
            </div>

            <div>
              <Button asChild>
                <a href="https://github.com/viendinhcom/esmate" target="_blank" rel="noopener noreferrer">
                  Learn ESMate
                  <ExternalLink />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/todos">Todos</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">Chat</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
