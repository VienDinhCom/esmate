"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "@esmate/shadcn/pkgs/lucide-react";

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalSteps = [
    "git clone https://github.com/nextjs/saas-starter",
    "pnpm install",
    "pnpm db:setup",
    "pnpm db:migrate",
    "pnpm db:seed",
    "pnpm dev 🎉",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-900 font-mono text-sm text-white shadow-lg">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 transition-colors hover:text-white"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          {terminalSteps.map((step, index) => (
            <div
              key={index}
              className={`${
                index > terminalStep ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <span className="text-green-400">$</span> {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
