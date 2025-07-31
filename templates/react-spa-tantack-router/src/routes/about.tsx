import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Title */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">About</h1>
        </div>
        {/* End Title */}
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-xl text-muted-foreground">
            This is a simple about page. You can use this page to tell your users a little bit about your application.
          </p>
        </div>
      </div>
    </div>
  );
}
