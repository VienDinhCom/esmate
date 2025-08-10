import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  lazy: () => import("./posts.lazy"),
});
