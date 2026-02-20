import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);

try {
    const pdfParse = require("pdf-parse");
    const PDFParse = pdfParse.PDFParse;

    const files = fs.readdirSync("uploads");
    const testFile = "uploads/" + files.find(f => f.endsWith(".pdf"));
    if (!testFile) throw new Error("No PDF found in uploads");
    const buffer = fs.readFileSync(testFile);

    console.log("--- Extraction Test 2 ---");
    try {
        // Convert buffer to Uint8Array as some libraries prefer it
        const uint8 = new Uint8Array(buffer);
        const instance = new PDFParse({ data: uint8, verbosity: -1 });
        console.log("Loading...");
        await instance.load();
        console.log("Getting text...");
        const text = await instance.getText();
        console.log("Success! Text length:", text.length);
    } catch (e) {
        console.log("Pattern failed:", e.message);
        try {
            const instance2 = new PDFParse({ url: testFile, verbosity: -1 });
            await instance2.load();
            const text2 = await instance2.getText();
            console.log("Success with url! Text length:", text2.length);
        } catch (e2) {
            console.log("URL pattern failed:", e2.message);
        }
    }
} catch (err) {
    console.error("Failed:", err.message);
}
