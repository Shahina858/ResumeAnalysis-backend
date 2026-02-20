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

    console.log("--- Final PDFParse Test ---");
    const uint8 = new Uint8Array(buffer);
    const instance = new PDFParse({ data: uint8, verbosity: -1 });
    await instance.load();

    const textResult = await instance.getText();
    console.log("Type of textResult:", typeof textResult);
    if (textResult && typeof textResult === 'object') {
        console.log("Keys of textResult:", Object.keys(textResult));
        // Maybe it's an array?
        if (Array.isArray(textResult)) {
            console.log("It is an array of length:", textResult.length);
            console.log("First element type:", typeof textResult[0]);
        }
    } else {
        console.log("textResult value:", textResult);
    }

    // Try getInfo
    const info = await instance.getInfo();
    console.log("Info keys:", Object.keys(info));

} catch (err) {
    console.error("Failed:", err.message);
}
