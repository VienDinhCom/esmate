import fs from "fs-extra";
import { globbySync } from "globby";
import { spawnSync } from "node:child_process";
import path from "node:path";

const commands = {
  clean: (patterns: string | readonly string[]) => {
    globbySync(patterns).forEach((p) => fs.rmSync(p));
  },
  exec: (command: string) => {
    spawnSync(command, { shell: true, stdio: "inherit", env: process.env });
  },
  export: async () => {
    const { dependencies } = JSON.parse(
      fs.readFileSync("package.json", "utf-8")
    );

    for (const [name] of Object.entries(dependencies)) {
      const filename = name.replace("@", "");

      console.log(`Exporting ${name} to src/pkgs/${filename}.ts`);

      let content = "";

      await import(name)
        .then((mod) => {
          content += `export * from "${name}";\n`;

          if (mod.default && name !== "lucide-react") {
            content += `export { default } from "${name}";\n`;
          }
        })
        .catch(() => {
          console.warn(`"${name}" is not a valid module.\n`);
        });

      if (content) {
        content = `// This file is auto-generated. Do not edit it directly.\n\n${content}`;

        const f = path.join("src/pkgs", filename + ".ts");

        fs.ensureFileSync(f);
        fs.writeFileSync(f, content);
      }
    }
  },
};

commands.clean("src/pkgs/**");
commands.clean("src/components/ui/**");
commands.clean(["src/lib/**", "!src/lib/utils.ts"]);
commands.clean(["src/hooks/**", "!src/hooks/use-zod-form.ts"]);

commands.exec("npx shadcn add --all");
await commands.export();
commands.exec("npx tsc --noEmit");

console.log("Shadcn package has been successfully built and exported.\n");
