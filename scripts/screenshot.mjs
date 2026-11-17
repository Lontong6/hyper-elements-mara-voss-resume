// Renders out/index.html in headless Chromium and captures preview.png
// (desktop, full page) and preview-mobile.png. Fails on any console error.
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const exe = path.join(
  homedir(),
  ".cache/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-linux64/chrome-headless-shell",
);
if (!existsSync(exe)) {
  console.error("Chromium headless shell not found at", exe);
  process.exit(2);
}

const target = "file://" + path.resolve(process.argv[2] ?? "out/index.html");
const prefix = process.argv[3] ?? "preview";

const browser = await chromium.launch({ executablePath: exe });
const errors = [];

async function shoot(viewport, file) {
  const page = await browser.newPage({ viewport });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${file}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${file}] pageerror: ${e.message}`));
  await page.goto(target, { waitUntil: "networkidle" }).catch(() => page.goto(target));
  await page.waitForTimeout(500);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", file);
  await page.close();
}

await shoot({ width: 1280, height: 900 }, `${prefix}.png`);
await shoot({ width: 390, height: 844 }, `${prefix}-mobile.png`);

await browser.close();
if (errors.length) {
  console.error("CONSOLE ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("console: clean");
