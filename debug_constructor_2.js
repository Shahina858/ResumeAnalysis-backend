import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
    const pdfParse = require("pdf-parse");
    const PDFParse = pdfParse.PDFParse;

    console.log("--- Instantiation Test ---");
    // Try common patterns for class-based PDF parsers
    try {
        const instance = new PDFParse();
        console.log("Instance keys:", Object.keys(instance));
        console.log("Instance prototype keys:", Object.keys(Object.getPrototypeOf(instance)));
    } catch (e) {
        console.log("Direct instantiation failed:", e.message);
    }
} catch (err) {
    console.error("Failed:", err.message);
}
