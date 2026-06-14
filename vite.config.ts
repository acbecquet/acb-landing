import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { copy } from "./src/content";

// Stamp the friendly text from src/content.ts into the {{placeholders}} in the
// HTML at build time, so the shipped pages are fully static (fast + SEO-friendly).
const injectCopy = {
  name: "inject-copy",
  transformIndexHtml(html: string): string {
    return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, key: string) =>
      key in copy ? copy[key] : `{{${key}}}`,
    );
  },
};

export default defineConfig({
  appType: "mpa",
  plugins: [injectCopy],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        memoir: fileURLToPath(new URL("./memoir.html", import.meta.url)),
      },
    },
  },
});
