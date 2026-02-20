import { createRequire } from "module";
const require = createRequire(import.meta.url);

async function checkLib() {
    try {
        const pdflib = require("pdf-parse");
        console.log("Type of pdflib:", typeof pdflib);
        console.log("Keys of pdflib:", Object.keys(pdflib));

        // Let's try to see if it's a standard CJS export or something else
        if (typeof pdflib === 'function') {
            console.log("✅ pdflib is a function.");
        } else {
            for (let key of Object.keys(pdflib)) {
                console.log(`Key '${key}' type:`, typeof pdflib[key]);
            }
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

checkLib();
