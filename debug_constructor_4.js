import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);

try {
    const pdfParse = require("pdf-parse");
    const PDFParse = pdfParse.PDFParse;

    // Find a PDF to test with
    const testFile = "uploads/" + fs.readdirSync("uploads")[0];
    if (!testFile) throw new Error("No PDF found in uploads");
    const buffer = fs.readFileSync(testFile);

    console.log("--- Extraction Test ---");
    try {
        const instance = new PDFParse({ verbosity: -1 });
        console.log("Loading buffer...");
        await instance.load(buffer);
        console.log("Getting text...");
        const text = await instance.getText();
        console.log("Success! Text length:", text.length);
        console.log("Preview:", text.slice(0, 50));
    } catch (e) {
        console.log("Pattern failed:", e.message);
        // Try another pattern: options with buffer
        try {
            const instance2 = new PDFParse({ buffer: buffer, verbosity: -1 });
            await instance2.load();
            const text2 = await instance2.getText();
            console.log("Success with buffer in options! Text length:", text2.length);
        } catch (e2) {
            console.log("Second pattern failed:", e2.message);
        }
    }
} catch (err) {
    console.error("Failed:", err.message);
}
