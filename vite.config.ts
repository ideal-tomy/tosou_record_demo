import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));
const SLIDE_NAME = "塗装_提案スライド.html";
const SLIDE_ROUTE = `/slides/${SLIDE_NAME}`;
const SLIDE_SRC = path.join(root, "docs", SLIDE_NAME);

function isProposalRequest(url = "") {
  const pathname = decodeURIComponent(url.split("?")[0] ?? "");
  return pathname === SLIDE_ROUTE;
}

function serveProposalPage(): Plugin {
  return {
    name: "serve-proposal-page",
    buildStart() {
      const publicCopy = path.join(root, "images", "slides");
      fs.mkdirSync(publicCopy, { recursive: true });
      fs.copyFileSync(SLIDE_SRC, path.join(publicCopy, SLIDE_NAME));
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!isProposalRequest(req.url ?? "")) return next();
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(SLIDE_SRC));
      });
    },
    writeBundle(options) {
      const outDir = options.dir ?? path.join(root, "dist");
      const destDir = path.join(outDir, "slides");
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(SLIDE_SRC, path.join(destDir, SLIDE_NAME));
    },
  };
}

export default defineConfig({
  plugins: [react(), serveProposalPage()],
  publicDir: "images",
  server: {
    port: 5174,
  },
});
