import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [message, setMessage] = useState("Click me to call /api/hello");

  const handleClick = async () => {
    try {
      const res = await fetch("/api/hello");
      const text = await res.text();
      setMessage(text);
    } catch (error) {
      setMessage("Error calling API");
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {message}
    </button>
  );
}
