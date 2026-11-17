import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, outline, render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import MaraVossResume from "./resume";

const template = <MaraVossResume />;

// The PDF renderer fetches nothing: every font the template names is
// handed over as bytes (assets/fonts — Inter and Fraunces, both OFL).
const font = async (family: string, file: string, weight: number, style: "normal" | "italic" = "normal") => ({
  family,
  src: await readFile(`assets/fonts/${file}`),
  weight,
  style,
});

try {
  const report = validate(template);
  console.log("— validate() —");
  console.log(formatDiagnostics(report.diagnostics) || "(no diagnostics)");
  if (!report.valid) {
    process.exitCode = 1;
    throw new Error("Template failed validation");
  }
  console.log("— outline() —");
  console.log(outline(template));

  const { html, text, diagnostics } = await render(template);
  console.log("— render() —");
  console.log(formatDiagnostics(diagnostics) || "(no diagnostics)");
  await mkdir("out", { recursive: true });
  await writeFile("out/resume.html", html);
  await writeFile("out/resume.txt", text);
  console.log(`wrote out/resume.html (${html.length} bytes) and out/resume.txt`);

  const { pdf, diagnostics: pdfDiagnostics } = await renderPdf(template, {
    fonts: [
      await font("Inter", "Inter-400.ttf", 400),
      await font("Inter", "Inter-600.ttf", 600),
      await font("Inter", "Inter-700.ttf", 700),
      await font("Inter", "Inter-800.ttf", 800),
      await font("Fraunces", "Fraunces-500.ttf", 500),
      await font("Fraunces", "Fraunces-700.ttf", 700),
    ],
  });
  console.log("— renderPdf() —");
  console.log(formatDiagnostics(pdfDiagnostics) || "(no diagnostics)");
  await writeFile("out/resume.pdf", pdf);
  console.log(`wrote out/resume.pdf (${pdf.length} bytes)`);
} catch (e) {
  if (e instanceof ElementsError) {
    console.error(formatDiagnostics(e.diagnostics));
    process.exitCode = 1;
  } else {
    throw e;
  }
}
