import { Button } from "@esmate/shadcn/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Title */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ESMate React</h1>
        </div>
        {/* End Title */}
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-xl text-muted-foreground">
            Uncomplicate React Single Application Development with Vite, Tantack Router, React Query, Tailwind CSS,
            Shaddcn UI, ESLint, Prettier, and more.
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <a href="https://github.com/viendinhcom/esmate" target="_blank" rel="noreferrer">
            <Button size="lg">ESMate</Button>
          </a>
          <a
            href="https://github.com/VienDinhCom/esmate/tree/main/templates/react-spa"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </a>
        </div>
        {/* End Buttons */}
      </div>
    </div>
  );
}
