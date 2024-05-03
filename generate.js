const fs = require('fs');

let blocklyDefines = fs.readFileSync("./src/Blockly/blocklyDefines.js");
let blocklyFuncs = fs.readFileSync("./src/Blockly/blocklyFuncs.js");
blocklyDefines = String(blocklyDefines).replace(/\`/ig, "\\`").replace(/\$/ig, '\\$');
blocklyFuncs = String(blocklyFuncs).replace(/\`/ig, "\\`").replace(/\$/ig,'\\$');

var JavaScriptObfuscator = require('javascript-obfuscator');
// makes code beautiful?
const version = "2.0.4";
let code = `
fetch(\`https://hitbox.io/bundle.js\`)
    .then(code => code.text())
    .then(code => {
        parent.document.getElementById("adboxverticalright").style.right = "-200%";
        parent.document.getElementById("adboxverticalleft").style.left = "-200%";

        // Set up
        let codeNames = {};
        const blocklyDefs = ${fs.readFileSync("./src/Blockly/blocklyDefs.json")};
        ${fs.readFileSync("./src/Ngmm/injector.js")}
        ${fs.readFileSync("./src/Ngmm/world.js")}
        ${fs.readFileSync("./src/Ngmm/ngmm.js")}
        ${fs.readFileSync("./src/Ngmm/state.js")}
        ${fs.readFileSync("./src/Ngmm/inputs.js")}
        ${fs.readFileSync("./src/Ngmm/editor.js")}
        let jsb = javascript.javascriptGenerator;
        let js = Blockly.JavaScript;
        ${fs.readFileSync("./src/Blockly/blocklyDefines.js")};
        ${fs.readFileSync("./src/Blockly/blocklyFuncs.js")};
        ${fs.readFileSync("./src/Ngmm/graphics.js")}
        ${fs.readFileSync("./src/Ngmm/simulation.js")}
     });
`

if (true) {
    code = JavaScriptObfuscator.obfuscate(code);
}

const content = `// ==UserScript==
// @name         Neon's Gamemode Maker TEST
// @namespace    http://tampermonkey.net/
// @version      v${version}
// @description  A Mod about custom gamemodes for hitbox.io.
// @author       iNeonz
// @match        https://heav.io/game.html
// @match        https://hitbox.io/game.html
// @match        https://heav.io/game2.html
// @match        https://hitbox.io/game2.html
// @match        https://hitbox.io/game-beta.html
// @require      https://unpkg.com/blockly/blockly.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=heav.io
// @grant        none
// @run-at       document-idle
// @downloadURL https://update.greasyfork.org/scripts/476080/Neon%27s%20Hitbox%20mod.user.js
// @updateURL https://update.greasyfork.org/scripts/476080/Neon%27s%20Hitbox%20mod.meta.js
// ==/UserScript==

const version = "v${version}";

${code};
`;

fs.writeFileSync(`./out/gmmaker-${version}.user.js`, content);