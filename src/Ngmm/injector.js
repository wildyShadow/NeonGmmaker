const newScope = (scope, script) => Function(`"use strict"; const globalThis = null; const window = null; const document = null; const game = this; for (let i in game.usedMath) {Math[i] = (...args) => {return game.Math[i](...args)};}; ${script}`).bind(scope);
const DN = ["gsFightersCollide", "recordMode", "o", "l", "u", "m", "g", "v", "k", "N", "S", "M", "C", "_", "T", "P", "B", "I", "F", "R", "O", "A", "D", "L", "U", "H", "J", "W", "G", "Y", "V", "q", "K", "X", "Z", "$", "tt", "it", "st", "ht", "et", "nt", "ot", "rt", "at", "lt", "ut", "ct", "dt", "wt", "ft", "gt", "bt"];
function appendScript(link, head) {
    let scr = document.createElement("script");
    scr.src = link;
    (head ? document.head : document.body).appendChild(scr);
}

// This was once used to get properties of every class, but a better method was found :D

const codeNamesRegex = {
    "simulation": {
        reg: /\];\}.{0,2}\(.{0,3}\) {var .{0,3},.{0,3},.{0,3},.{0,3},.{0,3},.{0,3};(.*?)\{throw new Error\("Failed to simulate(.*?)\);\}(.*?)\.step\((.*?)\);(.*?).{0,2}\(\);(.*?)\}.{0,2}\(\)/ig,
        verify: function (match) {
            let world = match[0].match(/this\..{2,2}\.step\(/ig)[0];
            let simulation = match[0].split(";}")[1].split("(")[0];
            let properties = match[0].split("this.");
            for (let i of properties) {
                if (i.match("=")) {
                    i = i.split("=")[0];
                } else {
                    i = null;
                }
            }
            properties.filter(a => a != null);
            return [simulation, properties[1].split(".")[0], properties[1].split(".")[1].split("(")[0], world.split("this.")[1].split(".")[0]];
        }
    },
}

// Execute the verification (may be replaced at any moment)

for (let i in codeNamesRegex) {
    codeNames[i] = codeNamesRegex[i].verify(code.match(codeNamesRegex[i].reg));
}

// Required monaco stuff, hacky method because greasyfork wouldn't allow me

let monacoCSS = document.createElement(`link`);
monacoCSS.rel = "stylesheet";
monacoCSS.setAttribute("data-name", "vs/editor/editor.main.css");
monacoCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/editor/editor.main.css";

let requirer = document.createElement("script");
requirer.textContent = `
       var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' } };
    `;
document.body.appendChild(requirer);

appendScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js");
appendScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/editor/editor.main.nls.js");
appendScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/editor/editor.main.js");
document.head.appendChild(monacoCSS);
var stateMaker;
var mostScore = -1;
const game = {
    state: null,
    Math: { "random": Math.random },
    usedMath: {
        "random": true
    }
}
const gmm = {
    enabled: false,
    pixi: {},
    overrides: {},
    applyOverrides: false,
    scopeFunc: null,
    collisions: [],
    destroyList: [],
    jointdestroyList: [],
    events: {
    }
}
window.gmm = gmm;

const gmmEvents = [
    "step",
    "step4each",
    "init",
    "init4each",
    'ondeath'
]

for (let a1 in window.multiplayerSession) {
    let a = window.multiplayerSession[a1];
    if (typeof a == "object") {
        let score = 0;
        for (let x1 in a) {
            let x = a[x1];
            if (typeof x == "object") {
                if (x.constructor.name == "Array") {

                }
                else {
                    let length = 0;
                    for (let y1 in x) {
                        let y = x[y1];
                        length++
                        if (length > 2) {
                            break;
                        }
                    }
                    if (length == 1) {
                        for (let y1 in x) {
                            let y = x[y1];
                            if (y.constructor.name == "Map") {
                                score++
                            }
                            break;
                        }
                    } else {
                        let isDN = true;
                        for (let i of DN) {
                            if (!i in x) {
                                isDN = false;
                                break;
                            }
                        }
                        if (isDN) {
                            score += 5;
                        }
                    }
                }
            }
        }
        if (score > mostScore && score < 50) {
            mostScore = score;
            stateMaker = a;
        }
    }
}

const stateVars = String(stateMaker.constructor).match(/this\.(.*?)=/ig);
stateVars.splice(0, 1);
const stateArray = [];
for (let i of stateVars) {
    if (i && i.match("=")) {
        stateArray.push(i.split("this.")[1].split("=")[0]);
    }
}

const Tsettings = stateMaker[stateArray[13]].settings[0]
const settingsArray = String(Tsettings.constructor).split("constructor() {")[1].match(/this\..{0,2}=(.*?);/ig);
const settingsEndArray = [];

for (let i of settingsArray) {
    if (i.match("=")) {
        settingsEndArray.push(i.split("this.")[1].split("=")[0]);
    }
}

let playerDataArray = stateArray[45].split('.');
function retrievePlayers() {
    return stateMaker[playerDataArray[0]][playerDataArray[1]];
}

function retrieveAllPlayers() {
    return stateMaker[stateArray[18]][playerDataArray[1]];
}
codeNames.settings = settingsEndArray;
const editorInfo = stateMaker[stateArray[18]];
let editorMaps = [];
let playerInfo = [];

const editorVar = String(editorInfo.constructor).match(/this\.(.*?)=/ig);
editorVar.splice(0, 1);
const editorVarArray = [];
for (let i of editorVar) {
    if (i && i.match("=")) {
        editorVarArray.push(i.split("this.")[1].split("=")[0]);
    }
}

editorMaps = editorInfo[editorVarArray[4]];
playerInfo = editorInfo[editorVarArray[2]];

const stateVars2 = String(stateMaker[stateArray[23]].constructor).match(/this\.(.*?)=/ig);
stateVars.splice(0, 1);
const stateArray2 = [];
for (let i of stateVars2) {
    if (i && i.match("=")) {
        stateArray2.push(i.split("this.")[1].split("=")[0]);
    }
}
function sendInfo(sett = {}, offset = 0) {
    if (hostId == myid) {
        sett.frame = getCurrentState()?.frame - offset;
        settings.nhm = sett;
        WSS.send(`42[1,[62,${JSON.stringify(settings)}]]`)
        WSS.onmessage({ data: `42[63,${JSON.stringify(settings)}]` })
    }
}
function setSett(setts) {
    let sett = {};
    let sects = setts.split('|');
    for (let o of sects) {
        let pr = o.split(':');
        if (pr[1]) {
            let v = JSON.parse(`[${pr[1]}]`)[0];
            sett[pr[0]] = v;
        }
    }
    WSS.onmessage({ data: `42[63,${JSON.stringify(sett)}]` })
    WSS.send(`42[1,[62,${JSON.stringify(sett)}]]`)
}
function StringToXMLDom(string) {
    let xmlDoc = null;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(string, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(string);
    }
    return xmlDoc;
}

let settings = {};
let trace = [];
let tracing = -1;
let traceLimit = 0;
class listener {
    constructor() {

    }
    add(event, func) {
        if (gmm.events[event]) {
            gmm.events[event].push(func);
        }
    }
}
function defineGMM(code, blocklys, switched) {
    gmmTextures = {};
    gmmSounds = {};
    gmm.enabled = true;
    gmm.events = [];
    gmm.code = code;
    for (let i in gmm.pixi) {
        gmm.pixi[i].container.destroy();
        delete gmm.pixi[i];
    }
    for (let i of gmmEvents) {
        gmm.events[i] = [];
    }
    gmm.listener = new listener();
    game.events = gmm.listener;
    let func = newScope(game, code);
    game.graphics = { create: createGraphics, index: 0, drawings: {}, loadTexture: loadTextureGMM };
    game.sound = { load: loadSoundGMM, play: playSoundGMM };
    try {
        func();
    } catch (error) {
        display("LEVEL 0 ERROR: " + error, "#ff0000", "#ff0000", true);
    }
    gmm.scopeFunc = func;
    if (hostId == myid) {
        sendInfo({ gmm: code, blocklyEnabled: jsSwitch, blockly: (new XMLSerializer().serializeToString(Blockly.Xml.workspaceToDom(blocklyWorkspace))) });
    }
    else {
        try {
            blocklyWorkspace.clear();
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(blocklys), blocklyWorkspace)
        } catch (err) {
            console.log(err);
        }
        window.monacoEditor.setValue(code);
        if (switched != undefined) {
            jsSwitch = switched;
        }
    }
}

let jsSwitch = false;
let myid = -1;
let hostId = -1;
const alive = {};

const render2 = window.PIXI.Text.prototype._render;
window.PIXI.Text.prototype._render = function (...args) {
    render2.call(this, ...args)
    if (this.parent && this._text) {
        let user = findUser(this._text);
        if (user) {
            user.obj = this.parent;
        }
        let player = findPlayer(this._text);
        if (player) {
            player.obj = this.parent;
        }
        lastPixiContainer = this.parent.parent;
        while (lastPixiContainer.parent) {
            lastPixiContainer = lastPixiContainer.parent;
        }

    }
}

let frames = 0;
let lc = Date.now();

let lastMO;

//SP.SE.ve[0].name
//SP.zE.eo[0];
let empty = {};

window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
    apply(target, thisArgs, args) {
        if (window.Blockly && blocklyWorkspace) {
            Blockly.svgResize(blocklyWorkspace);
        }
        let T = Date.now();
        let dt = (T - lc) / 1000;
        lc = T;
        frames++
        if (gmm.enabled) {
            updateDrawings(dt);
        }
        Reflect.apply(...arguments);
        gmmEditor.style.display = document.querySelector("#appContainer > div.lobbyContainer > div.settingsBox > div.hideLobbyButton.settingsButton").style.display != 'none' ? 'none' : 'block';
    }
})
function findUser(id) {
    let players = retrieveAllPlayers();
    for (let t in players) {
        let o = players[t];
        if (o.id == id || o.name == id) {
            o.index = t;
            return o;
            break;
        }
    }
}

function findPlayer(id) {
    let players = retrievePlayers();
    for (let t in players) {
        let o = players[t];
        if (o.id == id || o.name == id) {
            o.index = t;
            return o;
            break;
        }
    }
}

const updateGMMButton = () => {
    if (hostId == myid) {
        gmmEditor.classList.remove('disabled');
    } else {
        gmmEditor.classList.add('disabled');
    }
}

function decodeString(encodedString) {
    let decompressed = atob(decodeURIComponent(encodedString));
    let inflated = pako.inflate(decompressed, {
        '\x74\x6f': "string"
    });
    let decoded = JSON.parse(inflated);
    return decoded;
}

let chats = document.getElementsByClassName('content');
window.addEventListener('keydown', (event) => {

});

window.hescape = (s) => {
    let lookup = { '$': '&#36;', '%': '&#37;', '.': '&#46;', '+': '&#43;', '-': '&#45;', '&': "&amp;", '"': "&quot;", '\'': "&apos;", '<': "&lt;", '*': '&#42;', '=': '&#61;', '>': "&gt;", '#': '&#35;', ':': '&#58;', ';': '&#59;', '`': '&#96;' };
    return s.replace(/[\*=%#\-+&"'<>]/g, c => lookup[c]);
}

var lastMousePos = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
    e = e || window.event;
    let pos1 = lastMousePos.x || e.clientX;
    let pos2 = lastMousePos.y || e.clientY;
    lastMousePos = { x: e.clientX, y: e.clientY };
    if (document.activeElement && document.activeElement.dataset.dragable) {
        e.preventDefault();
        document.activeElement.style.top = (document.activeElement.offsetTop + (e.clientY - pos2)) + "px";
        document.activeElement.style.left = (document.activeElement.offsetLeft + (e.clientX - pos1)) + "px";
    }
});

function getRGBFromNUM(colorID, offset, max) {
    const red = (colorID >> 16) & 0xFF;
    const green = (colorID >> 8) & 0xFF;
    const blue = colorID & 0xFF;

    // Construct the RGB color representation
    return `rgb(${Math.max(max || 0, red - (offset || 0))}, ${Math.max(max || 0, green - (offset || 0))}, ${Math.max(max || 0, blue - (offset || 0))})`;
}

function display(text, ingamecolor, lobbycolor, sanitize) {
    if (WSS) {
        let div = document.createElement('div');
        div.classList.add('statusContainer');
        let span = document.createElement('span');
        span.classList.add('status');
        span.style.color = lobbycolor || "#ffffff";
        if (sanitize != false) {
            span.textContent = text;
        } else {
            span.innerHTML = text;
        }
        span.style.backgroundColor = 'rgba(37, 38, 42, 0.768627451)';
        div.style.borderRadius = '7px';
        div.appendChild(span);
        let clone = div.cloneNode(true);
        clone.children[0].style.color = ingamecolor || '#ffffff';
        setTimeout(() => {
            clone.remove();
        }, 11500);
        for (let i of chats) {
            if (i.parentElement.classList.contains('chatBox')) {
                i.appendChild(div);
                i.scrollTop = Number.MAX_SAFE_INTEGER;
            } else {
                i.appendChild(clone);
            }
        }
    }
}

let editorDiv = document.querySelector("#appContainer > div.lobbyContainer > div.settingsBox > div.editorButton.settingsButton");
let gmmEditor = editorDiv.cloneNode();
gmmEditor.innerHTML = 'GMM';
gmmEditor.style.width = 'calc((50% - 22px) / 2 - 5px)';
editorDiv.style.width = 'calc((50% - 22px) / 2 - 5px';
gmmEditor.style.right = 'calc((50% - 22px) / 2 + 20px)';
gmmEditor.onclick = () => {
    if (hostId == myid) {
        document.getElementsByClassName("lobbyContainer")[0].style.display = "none";
        editor.style.display = "block";
        return ' ';
    }
}
const splashScreen = document.createElement('div');
document.getElementById("appContainer").appendChild(splashScreen);
splashScreen.outerHTML = `<div id='splash' style='position: absolute; font-size: 10px; left: 20px; top: 20px; text-align: right; width: 290px; height: 160px; background-color: rgb(0,0,0,0.6); border-radius: 20px;'><img style='position: absolute; left: 10px; top: 10px; width: 150px; height: 150px;' src='https://github.com/wildyShadow/NeonGmmaker/blob/master/src/assets/ngmm_splash.png?raw=true' width='120' height='120'></img><div style='position: absolute; right: 5px; top: 5px;'><font size='5'>version: ${version}</font><p>NGMM has just loaded!</p><p>Original by sneezingCactus</p></div></div>`
setTimeout(() => {
    document.querySelector("#splash").remove()
}, 5000);
editorDiv.parentNode.appendChild(gmmEditor);