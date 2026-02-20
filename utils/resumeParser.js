import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/**
 * Parses PDF text from a buffer using the Mehmet Kozan's pdf-parse fork (v2.4.5+)
 * @param {Buffer} buffer - The PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
const parseResume = async (buffer) => {
  if (!buffer) {
    throw new Error("No PDF buffer received");
  }

  try {
    // Mehmet Kozan's fork exports a PDFParse class
    const PDFParse = pdfParse.PDFParse;

    if (typeof PDFParse === 'function' && PDFParse.toString().includes('class')) {
      console.log("🧠 Using PDFParse class for extraction...");

      // Convert Node buffer to Uint8Array for library compatibility
      const uint8 = new Uint8Array(buffer);

      const instance = new PDFParse({
        data: uint8,
        verbosity: -1 // Suppress logs
      });

      console.log("⏳ Loading PDF...");
      await instance.load();

      console.log("⏳ Extracting text...");
      const result = await instance.getText();

      if (!result || typeof result.text !== 'string') {
        throw new Error("Failed to extract text (Empty or invalid result)");
      }

      console.log(`✅ Success: ${result.text.length} characters extracted`);
      return result.text;
    }

    // Fallback for standard pdf-parse or other variants
    console.log("📦 Using standard function for extraction...");
    const parseFunc = pdfParse.default || (typeof pdfParse === 'function' ? pdfParse : null);

    if (!parseFunc) {
      throw new Error("PDF parser library could not be initialized (No class or function found)");
    }

    const data = await parseFunc(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ PDF PARSE ERROR:", err.message);
    throw err;
  }
};

export default parseResume;
