const codeNamesRegex = {
    "simulation": {
        reg: /\];\}.{0,2}\(.{0,3}\) {var .{0,3},.{0,3},.{0,3},.{0,3},.{0,3},.{0,3};(.*?)\{throw new Error\("Failed to simulate(.*?)\);\}(.*?)\.step\((.*?)\);(.*?).{0,2}\(\);(.*?)\}.{0,2}\(\)/ig,
        verify: function (match) {
            //console.log(match);
            let world = match[0].match(/this\..{2,2}\.step\(/ig)[0];
            let sim = match[0].split(";}")[1].split("(")[0];
            //console.log(sim);
            let thisses = match[0].split("this.");
            //console.log(thisses);
            for (let i of thisses) {
                if (i.match("=")) {
                    i = i.split("=")[0];
                } else {
                    i = null;
                }
            }
            thisses.filter(a => a != null);
            //console.log(thisses);
            //console.log([sim,thisses[1].split(".")[0],thisses[1].split(".")[1].split("(")[0]]);
            return [sim, thisses[1].split(".")[0], thisses[1].split(".")[1].split("(")[0], world.split("this.")[1].split(".")[0]];
        }
    },
}
function appendScript(link, head) {
    let scr = document.createElement("script");
    scr.src = link;
    (head ? document.head : document.body).appendChild(scr);
}

for (let i in codeNamesRegex) {
    codeNames[i] = codeNamesRegex[i].verify(code.match(codeNamesRegex[i].reg));
}

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

const newScope = (scope, script) => Function(`"use strict"; const globalThis = null; const window = null; const document = null; const game = this; for (let i in game.usedMath) {Math[i] = (...args) => {return game.Math[i](...args)};}; ${script}`).bind(scope);

  let DN = [
        "gsFightersCollide",
        "recordMode",
        "o",
        "l",
        "u",
        "m",
        "g",
        "v",
        "k",
        "N",
        "S",
        "M",
        "C",
        "_",
        "T",
        "P",
        "B",
        "I",
        "F",
        "R",
        "O",
        "A",
        "D",
        "L",
        "U",
        "H",
        "J",
        "W",
        "G",
        "Y", // ss
        "V",
        "q",
        "K",
        "X",
        "Z",
        "$",
        "tt",
        "it",
        "st",
        "ht",
        "et",
        "nt",
        "ot",
        "rt",
        "at",
        "lt",
        "ut",
        "ct",
        "dt",
        "wt",
        "ft",
        "gt",
        "bt"
]

let stateMaker;
let mostScore = -1;
let game = {
    state: null,
    Math: { "random": Math.random },
    usedMath: {
        "random": true
    }
}
let gmm = {
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
const origRandom = Math.random;

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
// 23
const Tsettings = stateMaker[stateArray[13]].settings[0]
const settingsArray = String(Tsettings.constructor).split("constructor() {")[1].match(/this\..{0,2}=(.*?);/ig);
//console.log(String(Tsettings.constructor));
const settingsEndArray = [];
for (let i of settingsArray) {
    if (i.match("=")) {
        settingsEndArray.push(i.split("this.")[1].split("=")[0]);
    }
}
codeNames.settings = settingsEndArray;
console.log(stateArray);
const editorInfo = stateMaker[stateArray[18]];
let editorMaps = [];
const editorVar = String(editorInfo.constructor).match(/this\.(.*?)=/ig);
editorVar.splice(0, 1);
const editorVarArray = [];
for (let i of editorVar) {
    if (i && i.match("=")) {
        editorVarArray.push(i.split("this.")[1].split("=")[0]);
    }
}
console.log(editorVarArray, "l");
editorMaps = editorInfo[editorVarArray[4]];
const stateVars2 = String(stateMaker[stateArray[23]].constructor).match(/this\.(.*?)=/ig);
// console.log(stateVars2);
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

let users = [];
let abc = 'abcdefghijklmnopqrstuvwxyz';
const alive = {};

const render = window.PIXI.Text.prototype._render;
window.PIXI.Text.prototype._render = function (...args) {
    render.call(this, ...args)
    if (this.parent && this._text) {
        alive[this._text] = { orbj: this, obj: this.parent, frames: 16, txt: this };
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
        /*if (currentState && currentState.mo){
        for (let id in currentState.mo){
         let info = currentState.mo[id];
            if (!info.injected){
                info.injected = true;
                let player = findUser(info.$h);
                console.log(player.name,"died?",info);
            }
        }
    }*/

        for (let i in alive) {
            let unalive = (!alive[i].obj || !alive[i].obj.transform || !alive[i].obj.parent || !alive[i].txt || !alive[i].txt.visible || alive[i].txt.parent != alive[i].obj || !alive[i].obj.visible || alive[i].obj.alpha <= 0);
            let p = findUser(i);
            if (p) {
                if (unalive) {
                    alive[i].frames--
                    if (alive[i].frames <= 0) {
                        delete alive[i];
                    }
                } else {
                    let topElement = alive[i].obj;
                    p.alive = true;
                    p.x = alive[i].obj.x;
                    p.y = alive[i].obj.y;
                    lastPixiContainer = alive[i].obj.parent;
                }
            } else {
                delete alive[i];
            }
        }
    }
})

const originalSend = window.WebSocket.prototype.send;
let excludewss = [];
let WSS = 0;

function findUser(id) {
    for (let t in users) {
        let o = users[t];
        if (o.id == id || o.name == id) {
            o.index = t;
            return o;
            break;
        }
    }
}

function updateGMMButton() {
    if (hostId == myid) {
        gmmEditor.classList.remove('disabled');
    } else {
        gmmEditor.classList.add('disabled');
    }
}
//eval setInterval(() => {sendInfo({execute:`this.state.po[0].th = -20;`});},2000);

function decodeString(encodedString) {
    let decompressed = atob(decodeURIComponent(encodedString));
    let inflated = pako.inflate(decompressed, {
        '\x74\x6f': "string"
    });
    let decoded = JSON.parse(inflated);
    return decoded;
}

window.WebSocket.prototype.send = function (args) {
    if (this.url.includes("/socket.io/?EIO=3&transport=websocket&sid=")) {
        if (typeof (args) == "string" && !excludewss.includes(this)) {
            if (!WSS) {
                WSS = this;
            }
            if (WSS == this) {
                if (args.startsWith('42[1,[')) {
                    try {
                        let packet = JSON.parse(args.slice(5, -1))
                        if (packet[0] == 62) {
                            settings = packet[1];
                        }
                    } catch (error) { }
                } else if (args.startsWith('42[2,')) {
                    myid = 0;
                    hostId = 0;
                }
            } else {
                excludewss.push(this);
            }
            //console.log('SENT',args);
        }
        if (!this.injected) {
            this.injected = true;
            const originalClose = this.onclose;
            this.onclose = (...args) => {
                if (WSS == this) {
                    WSS = 0;
                    excludewss = [];
                    editor.style.display = "none";
                    users = [];
                    for (let i in gmm.pixi) {
                        gmm.pixi[i].container.destroy();
                        delete gmm.pixi[i];
                    }
                    gmm.enabled = false;
                }
                originalClose.call(this, ...args);
            }
            this.onmessage2 = this.onmessage;
            this.onmessage = function (event) {
                if (!excludewss.includes(this) && typeof (event.data) == 'string') {
                    if (event.data.startsWith('42[')) {
                        let packet = JSON.parse(event.data.slice(2, event.data.length));
                        if (packet[0] == 63) {
                            if (packet[1].nhm) {
                                if (packet[1].nhm.gmm && myid != hostId && (!packet[1].nhm.target || packet[1].nhm.target == myid)) {
                                    defineGMM(packet[1].nhm.gmm, packet[1].nhm.blockly, packet[1].nhm.blocklyEnabled);
                                    display("[NGMM] The host has changed the gamemode.")
                                    console.log(packet[1].nhm.gmm);
                                }
                                delete packet[1].nhm;
                            }
                            settings = packet[1];
                        }
                        if (packet[0] == 7) {
                            myid = packet[1][0]
                            hostId = packet[1][1];
                            updateGMMButton();
                            for (let i of packet[1][3]) {
                                users.push({ "team": i[2], "color": (i[7][0] || i[7][1]), "name": i[0], "id": i[4], "lvl": i[6] });
                            }
                        }
                        if (packet[0] == 25) {
                            let plr = findUser(packet[1]);
                            if (plr) {
                                plr.team = packet[2];
                            }
                        }
                        if (packet[0] == 9) {
                            hostId = packet[2];
                            updateGMMButton();
                            let user = findUser(packet[1]);
                            if (user) {
                                users.splice(user.index, 1);
                            }
                        }
                        if (packet[0] == 45) {
                            hostId = packet[1];
                            updateGMMButton();
                        }
                        if (packet[0] == 8) {
                            if (myid == hostId && gmm.enabled) {
                                sendInfo({ gmm: gmm.code, target: packet[1][4] });
                            }
                            if (gmm.enabled) {
                                if (game.state && getCurrentState()) {
                                    for (let func of gmm.events.init4each) {
                                        func(packet[1][2]);
                                    }
                                }
                            }
                            users.push({ "name": packet[1][0], "color": (packet[7] ? (packet[7][1] || packet[7][0]) : undefined), "team": packet[1][2], "id": packet[1][4], "lvl": packet[1][6] });
                        }
                    }
                }
                this.onmessage2.call(this, event);
            }
        }
    }
    return originalSend.call(this, args);
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
splashScreen.outerHTML = `<div id='splash' style='position: absolute; font-size: 10px; left: 20px; top: 20px; text-align: right; width: 290px; height: 160px; background-color: rgb(0,0,0,0.6); border-radius: 20px;'><img style='position: absolute; left: 10px; top: 10px;' src='https://raw.githubusercontent.com/SneezingCactus/gmmaker/master/src/gmWindow/images/gmmlogo.png' width='120' height='120'></img><div style='position: absolute; right: 5px; top: 5px;'><font size='5'>version: ${version}</font><p>NGMM has just loaded!</p><p>Original by sneezingCactus</p></div></div>`
setTimeout(() => {
    document.querySelector("#splash").remove()
}, 5000);
editorDiv.parentNode.appendChild(gmmEditor);