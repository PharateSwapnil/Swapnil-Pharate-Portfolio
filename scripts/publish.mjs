/**
 * npm run publish
 *
 * Reads  public/portfolio-data.json  (downloaded from the in-app editor)
 * and bakes it directly into DEFAULT_DATA in src/Portfolio.jsx
 * so the next `npm run build` picks up all your changes.
 *
 * Workflow:
 *   1. npm run dev  →  edit content in UI
 *   2. Editor → "Save Changes"
 *   3. Editor → "Export for Prod"  →  save as  public/portfolio-data.json
 *   4. npm run publish             →  patches Portfolio.jsx
 *   5. npm run build               →  production bundle
 *   6. Deploy dist/
 */

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dir    = path.dirname(fileURLToPath(import.meta.url));
const root     = path.resolve(__dir, "..");
const jsonPath = path.join(root, "public", "portfolio-data.json");
const jsxPath  = path.join(root, "src",    "Portfolio.jsx");

if (!fs.existsSync(jsonPath)) {
  console.error("❌  public/portfolio-data.json not found.");
  console.error("    Steps: Open editor → Save Changes → Export for Prod");
  console.error("           → save the downloaded file as public/portfolio-data.json");
  process.exit(1);
}

let newData;
try {
  newData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
} catch(e) {
  console.error("❌  Could not parse portfolio-data.json:", e.message);
  process.exit(1);
}

// Strip base64 dataUrls — icons should live as files in public/icons/
if (newData.orbitIcons) {
  newData.orbitIcons = newData.orbitIcons.map(({ dataUrl, ...rest }) => rest);
}

let jsx = fs.readFileSync(jsxPath, "utf8");

const startToken = "const DEFAULT_DATA = ";
const startIdx   = jsx.indexOf(startToken);
if (startIdx === -1) {
  console.error("❌  DEFAULT_DATA not found in Portfolio.jsx");
  process.exit(1);
}

// Walk braces to find end of the object
let depth = 0, endIdx = startIdx + startToken.length, opened = false;
while (endIdx < jsx.length) {
  if (jsx[endIdx] === "{") { depth++; opened = true; }
  if (jsx[endIdx] === "}") depth--;
  endIdx++;
  if (opened && depth === 0) break;
}
if (jsx[endIdx] === ";") endIdx++;

const newBlock = startToken + JSON.stringify(newData, null, 2) + ";";
jsx = jsx.slice(0, startIdx) + newBlock + jsx.slice(endIdx);

fs.writeFileSync(jsxPath, jsx, "utf8");
console.log("✅  Portfolio.jsx DEFAULT_DATA updated successfully!");
console.log("    Now run:  npm run build  →  deploy dist/");
