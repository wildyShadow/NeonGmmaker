const fs = require('fs');

let blocklyDefines = fs.readFileSync("./src/Blockly/blocklyDefines.js");
let blocklyFuncs = fs.readFileSync("./src/Blockly/blocklyFuncs.js");
blocklyDefines = String(blocklyDefines).replace(/\`/ig, "\\`").replace(/\$/ig, '\\$');
blocklyFuncs = String(blocklyFuncs).replace(/\`/ig, "\\`").replace(/\$/ig,'\\$');

var JavaScriptObfuscator = require('javascript-obfuscator');
// makes code beautiful?
const td = fs.readFileSync("./src/webdocs/gmmd.ts")

const version = "2.0.8";
let code = `
fetch(\`https://hitbox.io/bundle.js\`)
    .then(code => code.text())
    .then(code => {
        parent.document.getElementById("adboxverticalright").style.right = "-200%";
        parent.document.getElementById("adboxverticalleft").style.left = "-200%";

        // Set up
        let codeNames = {};
        const blocklyDefs = ${fs.readFileSync("./src/Blockly/blocklyDefs.json")};
        const libSource = \`${td}\`;
        // INJECTOR
        // this is the main part that will load the code and attempt to steal classes
        // After retrieving each class, we are able to replace functions and inject the mod into them
        ${fs.readFileSync("./src/Ngmm/injector.js")}
        // WEBSOCKET
        // this is the section that will handle the game's socket
        // required to change the mode or exit upon a crash
        ${fs.readFileSync("./src/Ngmm/websocket.js")}
        // WORLD
        // box2d world
        ${fs.readFileSync("./src/Ngmm/world.js")}
        // NGMM
        // pre-defined functions or variables
        ${fs.readFileSync("./src/Ngmm/ngmm.js")}
        // STATE
        // used for molding the inner game states
        ${fs.readFileSync("./src/Ngmm/state.js")}
        // INPUTS
        // used to override inputs or track them ingame
        ${fs.readFileSync("./src/Ngmm/inputs.js")}
        // EDITOR
        // editor related stuff
        ${fs.readFileSync("./src/Ngmm/editor.js")}
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
// @name         Neon's Gamemode Maker beta
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
// @icon         https://github.com/wildyShadow/NeonGmmaker/blob/master/src/assets/ngmm.png?raw=true
// @grant        none
// @run-at       document-idle
// ==/UserScript==

const version = "v${version}";

${code};
`;

fs.writeFileSync(`./web-ext-artifacts/ngmmaker-${version}.user.js`, content);