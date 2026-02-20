import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
    const pdfParse = require("pdf-parse");
    console.log("--- PDF-PARSE DIAGNOSTICS ---");
    console.log("Type of pdfParse:", typeof pdfParse);
    console.log("Keys:", Object.keys(pdfParse));

    const target = pdfParse.PDFParse || pdfParse.default || pdfParse;
    console.log("Target type:", typeof target);

    if (target) {
        console.log("Target stringified:", target.toString().slice(0, 100));
        try {
            console.log("Is target a class (via prototype test):", !!target.prototype && !!target.prototype.constructor.name);
        } catch (e) {
            console.log("Prototype check failed:", e.message);
        }
    }
} catch (err) {
    console.error("Failed to load pdf-parse:", err.message);
}
