import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
    const pdfParse = require("pdf-parse");
    const PDFParse = pdfParse.PDFParse;

    console.log("--- Instantiation Test 2 ---");
    try {
        const instance = new PDFParse({});
        console.log("Instance keys:", Object.keys(instance));
        // Let's see if there is a 'parse' method
        if (instance.parse) {
            console.log("FOUND parse method!");
        } else {
            // Check for other common names
            const proto = Object.getPrototypeOf(instance);
            console.log("Prototype methods:", Object.getOwnPropertyNames(proto));
        }
    } catch (e) {
        console.log("Instantiation with {} failed:", e.message);
    }
} catch (err) {
    console.error("Failed:", err.message);
}
