// ==UserScript==
// @name         Neon's Gamemode Maker beta
// @namespace    http://tampermonkey.net/
// @version      v2.0.6
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

const version = "v2.0.6";


fetch(`https://hitbox.io/bundle.js`)
    .then(code => code.text())
    .then(code => {
        parent.document.getElementById("adboxverticalright").style.right = "-200%";
        parent.document.getElementById("adboxverticalleft").style.left = "-200%";

        // Set up
        let codeNames = {};
        const blocklyDefs = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "id": null,
      "categorystyle": null,
      "colour": "#536f92",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Logic",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "controls_ifelse"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        },
        {
          "kind": "block",
          "type": "logic_negate"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "block",
          "type": "text"
        },
        {
          "kind": "block",
          "type": "text_length"
        },
        {
          "kind": "block",
          "type": "text_isEmpty"
        }
      ]
    },
    {
      "id": null,
      "categorystyle": null,
      "colour": "#536f92",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Math",
      "contents": [
        {
          "type": "math_number",
          "kind": "block",
          "fields": {
            "NUM": 123
          }
        },
        {
          "type": "math_arithmetic",
          "kind": "block",
          "fields": {
            "OP": "ADD"
          },
          "inputs": {
            "A": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            },
            "B": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            }
          }
        },
        {
          "type": "math_single",
          "kind": "block",
          "fields": {
            "OP": "ROOT"
          },
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 9
                }
              }
            }
          }
        },
        {
          "type": "math_trig",
          "kind": "block",
          "fields": {
            "OP": "SIN"
          },
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 45
                }
              }
            }
          }
        },
        {
          "type": "math_constant",
          "kind": "block",
          "fields": {
            "CONSTANT": "PI"
          }
        },
        {
          "type": "math_number_property",
          "kind": "block",
          "fields": {
            "PROPERTY": "EVEN"
          },
          "inputs": {
            "NUMBER_TO_CHECK": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 0
                }
              }
            }
          }
        },
        {
          "type": "math_round",
          "kind": "block",
          "fields": {
            "OP": "ROUND"
          },
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 3.1
                }
              }
            }
          }
        },
        {
          "type": "math_on_list",
          "kind": "block",
          "fields": {
            "OP": "SUM"
          }
        },
        {
          "type": "math_modulo",
          "kind": "block",
          "inputs": {
            "DIVIDEND": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 64
                }
              }
            },
            "DIVISOR": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 10
                }
              }
            }
          }
        },
        {
          "type": "math_constrain",
          "kind": "block",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 50
                }
              }
            },
            "LOW": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            },
            "HIGH": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 100
                }
              }
            }
          }
        },
        {
          "type": "math_random_int",
          "kind": "block",
          "inputs": {
            "FROM": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            },
            "TO": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 100
                }
              }
            }
          }
        },
        {
          "type": "math_random_float",
          "kind": "block"
        },
        {
          "type": "math_atan2",
          "kind": "block",
          "inputs": {
            "X": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            },
            "Y": {
              "shadow": {
                "type": "math_number",
                "fields": {
                  "NUM": 1
                }
              }
            }
          }
        }
      ]
    },
    {
      "id": null,
      "categorystyle": null,
      "colour": "#b57dff",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Events",
      "contents": [
        {
          "kind": "block",
          "type": "event_init"
        },
        {
          "kind": "block",
          "type": "event_step"
        }
      ]
    },
    {
      "id": null,
      "categorystyle": null,
      "colour": "#b57dff",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Variables",
      "contents": [
        {
          "kind": "block",
          "type": "define_local"
        },
        {
          "kind": "block",
          "type": "get_local"
        },
        {
          "kind": "block",
          "type": "set_local"
        },
        {
          "kind": "block",
          "type": "define_group"
        },
        {
          "kind": "block",
          "type": "set_group"
        },
        {
          "kind": "block",
          "type": "get_group"
        }
      ]
    },
    {
      "id": null,
      "categorystyle": null,
      "colour": "#b57dff",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Cubes",
      "contents": [
        {
          "kind": "block",
          "type": "cube_get"
        },
        {
          "kind": "block",
          "type": "cube_set"
        },
        {
          "kind": "block",
          "type": "cube_exist"
        },
        {
          "kind": "block",
          "type": "input_get"
        },
        {
          "kind": "block",
          "type": "input_override"
        },
        {
          "kind": "block",
          "type": "input_no_override"
        }
      ]
    },
    {
      "id": null,
      "categorystyle": null,
      "colour": "#b57dff",
      "cssconfig": null,
      "hidden": false,
      "kind": "category",
      "name": "Vector",
      "contents": [
        {
          "kind": "block",
          "type": "vector"
        },
        {
          "kind": "block",
          "type": "vector_math"
        },
        {
          "kind": "block",
          "type": "vector_math2"
        }
      ]
    }
  ]
};
        const libSource = `/**
* A projectile's structure.
*/
declare interface projectile {
    /**
    * A projectile's position (Vector2).
    */
    public p: [0, 0];
    /**
    * A projectile's velocity (Vector2).
    */
    public lv: [0, 0];
    /**
    * A projectile's angle (radians).
    */
    public a: number;
    /**
    * A projectile's angular velocity (radians).
    */
    public av: number;
    /**
    * A projectile's frames til death (number).
    */
    public ftd: number;
    /**
    * A projectile's turn rate (number).
    */
    public tr: number;
    /**
    * A projectile's gravity scale (number).
    */
    public gs: number;
    /**
    * A projectile's explode radius (number).
    */
    public er: number;
    /**
    * Determines when the bullet can bounce (boolean).
    */
    public bb: boolean;
    /**
    * A projectile's round value.
    */
    public round: boolean;
    /**
    * A projectile's restitution (Number).
    */
    public restitution: number;
    /**
    * A projectile's bounce count (number).
    */
    public bc: number;
    /**
    * A projectile's owner id (number).
    */
    public owner: number;
    /**
    * A projectile's bullet radius (number).
    */
    public br: number;
}


/**
* The essencial events for a mode.
*/
declare interface listener {
    /**
    * Attach a event to the mode.
    */
    public add(string: name, method: func);
}
declare interface input {
    /**
    * True when the player is pressing left.
    */
    public left: boolean;
    /**
    * True when the player is pressing right.
    */
    public right: boolean;
    /**
    * True when the player is pressing up.
    */
    public up: boolean;
    /**
    * True when the player is pressing down.
    */
    public down: boolean;
    /**
    * True when the player is pressing action1 aka force push.
    */
    public action1: boolean;
    /**
    * True when the player is pressing action2 aka grab.
    */
    public action2: boolean;
    /**
    * True when the player is pressing action3 aka bat.
    */
    public action3: boolean;
    /**
    * True when the player is pressing action4 aka rocket.
    */
    public action4: boolean;
}

/**
* Array with inputs of the players, may disappear when killed until respawned, indexed by ids.
*/
declare const inputs = [
    input
]
/**
* in game sound effects.
*/
declare interface sound {
    /**
    * Load a sound effect
    */
    public load(soundId: string, url: string);
    /**
    * Play a sound effect
    */
    public play(soundId: string, volume: number);
}
/**
* Information about player data.
*/
declare interface playerData {
    /**
    * The amount of lives a player has.
    */
    public lives: number;
    /**
    * The latest killer of this cube.
    */
    public killedBy: number;
    /**
    * The amounts of kills a player has.
    */
    public kills: number;
    /**
    * The id of the last spawn point of this player.
    */
    public respawnIndex: number;
    /**
    * Amount of frames before the player respawns.
    */
    public respawn: number;
}
/**
* Information about the game's graphics.
*/
declare interface graphics {
    /**
    * Create a drawing.
    * example: const id = game.graphics.create({p:[0,0],a: 0,attach:"world",attachId:-1,scale: [1,1],shapes:[{type:"bx",p:[0,0],size:[10,10],a: 0,color: 0xffffff}]});
    */
    public create(drawing: object);
    /**
    * Load a image with url, assign to id
    */
    public loadTexture(textureId: string, textureUrl: string);
    /**
    * Drawings array, ordered by id.
    */
    public drawings: any[];
}
/**
* A Object representing a cube.
*/
declare interface cube {
    /**
    * The Position (Vector2) of a cube.
    */
    public p: [0, 0];
    /**
    * This option marks if the cube can jump in mid air.
    */
    public dj: boolean;
    /**
    * The angle in radians of a rocket.
    */
    public ra: number;
    /**
    * Rocket frames, if higher than -1 the player is rocketing, caps at 6.
    */
    public rf: number;
    /**
    * Freeze frames, if higher than 0 the player is frozen still.
    */
    public ff: number;
    /**
    * Bat frames, if higher than -1 the player is batting, caps at 8.
    */
    public bf: number;
    /**
    * The angle in radians of a bat.
    */
    public ba: number;
    /**
    * The Linear Velocity (Vector2) of a cube.
    */
    public lv: [0, 0];
    /**
    * The Stamina (Number) of a cube.
    */
    public st: number;
    /**
    * The Health (Number) of a cube, If higher than 100, the cube will take longer to die from impact, plats and void.
    */
    public hp: number;
    /**
    * The IFrames (Number) of a cube, If higher than zero, plats won't kill and the cube will be able to jump into the void.
    */
    public iframes: number;
    /**
    * The amount of steps survived since the last spawn.
    */
    public stepsSurvived: number;
    /**
    * The angle (radians) of a cube.
    */
    public a: number;
    /**
    * The angular velocity (radians) of a cube.
    */
    public av: number;
    /**
    * The Team of a cube [0 = SPEC, 1 = FFA,2 = RED, 3 = BLUE]
    */
    public team: number;
}

/**
 * The world class used for game checks or physics.
 */
declare interface world {
    public raycast(position1: array, position2: array, filter);
}

/**
 * A object representing a flag.
 */
declare interface flag {
    /*
    * The position of a flag.
    */
    public p: [0, 0];
    /*
    * The Capture frames of a flag.
    */
    public capFrames: number;
    /*
    * The capture frames limit of a flag.
    */
    public capLimit: number;
    /*
    * The id of the owner of a flag.
    */
    public takenBy: number;
}

/**
* A Object representing the current game's state.
*/
declare class stateStep {
    /**
    * A array representing all flags in the map.
    */
    public flags: flag[];
    /**
    * A array representing data of all the alive players.
    */
    public playerData: playerData[];
    /**
    * A array representing all the alive players.
    */
    public cubes: cube[];
    /**
    * A array representing all the projectiles.
    */
    public projectiles: projectile[];
    /**
     * current frame of this step.
     */
    public frames: number;
}

/**
* Vector utility
*/
declare interface vector {
    /**
    * Add two vectors.
    */
    public add(a: any, b: any);
    /**
    * Magnitude of a vector.
    */
    public magn(a: any);
    /**
    * Subtract two vectors.
    */
    public sub(a: any, b: any);
    /**
    * Multiply two vectors
    */
    public mult(a: any, b: any);
    /**
    * Divide two vectors.
    */
    public div(a: any, b: any);
    /**
    * Get the angle in radians of a vector.
    */
    public angleOf(a: any);
    /**
    * Get the normalized result of a vector.
    */
    public norm(a: any);
    /**
    * Get the scalar dot product of two vectors.
    */
    public dot(a: any, b: any);
}

/**
* The general game information.
*/
namespace game {
    /**
    * This is a empty object that you can use to hold variables, use this instead of setting a const, let or var outside any events.
    */
    const vars: any;
    /**
    * This is your client ID, use for local visuals.
    */
    const clientId: number;
    /**
    * This is your host ID, use for local visuals.
    */
    const hostId: number;
    /**
    * This is a object for utiltiy with the box2d world.
    */
    const world: world;
    /**
    * This is a array that contains overridable properties of each player's input, set to null to stop override.
    */
    const overrides: input[];
    /**
    * in game sound effects.
    */
    const sound: sound;
    /**
    * Information about the current game's graphics.
    */
    const graphics: graphics;
    /**
    * Vector utiltiy.
    */
    const Vector: vector;
    /**
    * The current game's state.
    */
    const state: stateStep;
    /**
    * The previous game's state.
    */
    const prevState: stateStep;
    /**
    * The game events.
    */
    const events: listener;
    /**
    * The current game's inputs.
    */
    const inputs: input[];
}`;
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
        const originalSend = window.WebSocket.prototype.send;
let excludewss = [];
let WSS = 0;

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
        }
        if (!this.injected) {
            this.injected = true;
            const originalClose = this.onclose;
            this.onclose = (...args) => {
                if (WSS == this) {
                    WSS = 0;
                    excludewss = [];
                    editor.style.display = "none";
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
                                }
                                delete packet[1].nhm;
                            }
                            settings = packet[1];
                        }
                        if (packet[0] == 7) {
                            myid = packet[1][0]
                            hostId = packet[1][1];
                            updateGMMButton();
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
                        }
                    }
                }
                this.onmessage2.call(this, event);
            }
        }
    }
    return originalSend.call(this, args);
}
        function getWorld() {
    for (let i in stateMaker[codeNames.simulation[3]]) {
        if (stateMaker[codeNames.simulation[3]][i].m_island) {
            return stateMaker[codeNames.simulation[3]][i];
        } else if (stateMaker[codeNames.simulation[3]][i].PostSolve && !stateMaker[codeNames.simulation[3]][i].injected) {
            stateMaker[codeNames.simulation[3]][i].injected = true;
            let a = stateMaker[codeNames.simulation[3]][i];
            const postSolve = a.PostSolve;
            a.PostSolve = function (contact, impulses) {
                if (impulses.normalImpulses[0] > 0.05 && gmm.enabled) {
                    const worldManifold = new window.Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(worldManifold);
                    /*gmm.collisions.push({
                        fixtureAData: contact.GetFixtureA().GetUserData(),
                        fixtureABodyData: contact.GetFixtureA().GetBody().GetUserData(),
                        fixtureBData: contact.GetFixtureB().GetUserData(),
                        fixtureBBodyData: contact.GetFixtureB().GetBody().GetUserData(),
                        normal: {x: worldManifold.m_normal.x, y: worldManifold.m_normal.y},
                    });*/
                }

                return postSolve(...arguments);
            };
        }
    }
}
let b2World = getWorld();
const b2Vec2 = window.Box2D.Common.Math.b2Vec2
b2World.DestroyJointo = b2World.DestroyJoint;
b2World.DestroyBodo = b2World.DestroyBody;
b2World.DestroyBody = (id) => {
    if (!gmm.enabled) {
        return b2World.DestroyBodo(id);
    } else {
        gmm.destroyList.push(id);
    }
}
b2World.DestroyJoint = (id) => {
    if (!gmm.enabled) {
        return b2World.DestroyJointo(id);
    } else {
        gmm.jointdestroyList.push(id);
    }
}

function getCause(cube, state) {
    let cause = [-1, -1];
    let nearestRocket = 0;
    let largest = 1 / 0;
    for (let id in state.projectiles) {
        let proj = state.projectiles[id];
        if (proj) {
            let dist = vectorUtils.magn([(proj.p[0] + proj.p[0] / 30) - cube.p[0], (proj.p[1] + proj.p[1] / 30) - cube.p[0]]);
            if (dist < largest) {
                largest = dist;
                nearestRocket = proj;
            }
        }
    }
    if (nearestRocket) {
        cause = [0, nearestRocket.owner];
    }
    if (vectorUtils.magn(cube.lv) / 15 > cube.hp) {
        cause = [1, -1];
    }
    return cause;
}
function raycast(origin, end, filter) {
    const hits = [];

    const rayCastCallback = (fixture, point, normal, fraction) => {
        const bodyData = fixture.GetBody().GetUserData();
        const fixtureData = fixture.GetUserData();

        let body_info = null;
        for (let i in bodyData) {
            try {
                if ("id" in bodyData[i] || bodyData[i].id) {
                    body_info = bodyData[i];
                    break;
                }
            } catch (error) {

            }
        }
        const hit = {
            type: null,
            bodyData: body_info,
            id: (body_info || bodyData)?.id,
            point: [point.x, point.y],
            normal: [normal.x, normal.y],
        };

        if (codeNames.general[11] in (body_info || bodyData || {})) {
            hit.type = "cube";
        } else {
            hit.type = "shape";
        }

        hits[fraction] = hit;

        return -1;
    };
    b2World.RayCast(
        rayCastCallback,
        new b2Vec2(origin[0], origin[1]),
        new b2Vec2(end[0], end[1])
    );
    const keysInOrder = Object.keys(hits).sort();
    let theChosenOne = null;;

    for (let i = 0; i < keysInOrder.length; i++) {
        const hit = hits[keysInOrder[i]];

        if (!filter || filter(hit)) {
            theChosenOne = hit;
            break;
        }
    }

    return theChosenOne;
}
        const vectorUtils = {
    magn: function (n1) {
        return Math.sqrt(n1[0] ** 2 + n1[1] ** 2);
    },
    add: function (n1, n2) {
        if (n1.constructor == Number) {
            n1 = [n1, n1];
        }
        if (n2.constructor == Number) {
            n2 = [n2, n2];
        }
        let p1 = [...n1];
        let p2 = [...n2];
        for (let i in p1) {
            p1[i] += p2[i] || (p2[0] || 0);
        }
        return p1;
    },
    sub: function (n1, n2) {
        if (n1.constructor == Number) {
            n1 = [n1, n1];
        }
        if (n2.constructor == Number) {
            n2 = [n2, n2];
        }
        let p1 = [...n1];
        let p2 = [...n2];
        for (let i in p1) {
            p1[i] -= p2[i] || (p2[0] || 0);
        }
        return p1;
    },
    mult: function (n1, n2) {
        if (n1.constructor == Number) {
            n1 = [n1, n1];
        }
        if (n2.constructor == Number) {
            n2 = [n2, n2];
        }
        let p1 = [...n1];
        let p2 = [...n2];
        for (let i in p1) {
            p1[i] *= p2[i] || (p2[0] || 0);
        }
        return p1;
    },
    div: function (n1, n2) {
        if (n1.constructor == Number) {
            n1 = [n1, n1];
        }
        if (n2.constructor == Number) {
            n2 = [n2, n2];
        }
        let p1 = [...n1];
        let p2 = [...n2];
        for (let i in p1) {
            p1[i] /= p2[i] || (p2[0] || 0);
        }
        return p1;
    },
    angleOf: function (n1) {
        return Math.atan2(n1[1], n1[0]);
    },
    norm: function (n1) {
        let a = Math.atan2(n1[1], n1[0]);
        return [Math.cos(a), Math.sin(a)];
    },
    dot: function (n1, n2) {
        return n1.map((x, i) => n1[i] * n2[i]).reduce((m, n) => m + n)
    }
}
function SeedRandom(state1, state2) {
    var mod1 = 4294967087;
    var mul1 = 65539;
    var mod2 = 4294965887;
    var mul2 = 65537;

    if (typeof state1 !== "number") {
        state1 = +new Date();
    }
    if (typeof state2 !== "number") {
        state2 = state1;
    }

    state1 = state1 % (mod1 - 1) + 1;
    state2 = state2 % (mod2 - 1) + 1;

    function random(limit) {
        var rand;
        do {
            state1 = (state1 * mul1) % mod1;
            state2 = (state2 * mul2) % mod2;
            rand = (state1 + state2) % limit;
        } while (rand >= limit);
        return rand;
    }

    return random;
}

let stateProperty;

function getAllStates() {
    let state;
    if (stateProperty) {
        state = stateMaker[stateProperty];
    } else {
        for (let a in stateMaker) {
            let b = stateMaker[a];
            if (b.constructor.name == "Array") {
                for (let i of b) {
                    if (typeof (i) == "object" && "all" in i && i.all.constructor.name == "Array") {
                        if (i.all.length > 10 && i.all.length < 15) {
                            state = b;
                            stateProperty = a;
                            break;
                        }

                    }
                }
            }
        }
    }
    if (state) {
        return state;
    }
}

function setStates(states) {
    let state;
    if (stateProperty) {
        state = stateMaker[stateProperty];
    } else {
        for (let a in stateMaker) {
            let b = stateMaker[a];
            if (b.constructor.name == "Array") {
                for (let i of b) {
                    if (typeof (i) == "object" && "all" in i && i.all.constructor.name == "Array") {
                        if (i.all.length > 10 && i.all.length < 15) {
                            state = b;
                            stateProperty = a;
                            break;
                        }

                    }
                }
            }
        }
    }
    if (state) {
        state = states;
    }
}
function getCurrentState() {
    let state;
    for (let a in stateMaker) {
        let b = stateMaker[a];
        if (b && b.constructor && b.constructor.name == "Array") {
            for (let it in b) {
                let i = b[it];
                if (typeof (i) == "object" && "all" in i && i.all.constructor.name == "Array") {
                    if (i.all.length > 10 && i.all.length < 15) {
                        state = b;
                        break;
                    }

                }
            }
        }
    }
    if (state) {
        let last;
        for (let a in state) {
            state[a].frame = a;
            last = state[a];
        }
        return last;
    }
}
        function encodeState(state) {
    let newState = state;
    newState.cubes = newState.all[8];
    newState.projectiles = [];
    for (let id in newState.all[9]) {
        let proj = newState.all[9][id];
        if (proj && codeNames.general) {
            if (!codeNames.projectiles) {
                let matches = String(proj.constructor).match(/this\.(.*?)=(.*?);/ig);
                let m = [];
                for (let i of matches) {
                    m.push(i.split("this.")[1].split("=")[0]);
                }
                codeNames.projectiles = m;
            }
            let newProj = {
                p: [proj.x, proj.y],
                lv: [proj[codeNames.lv[0]], proj[codeNames.lv[1]]],
                a: proj.angle,
                av: proj.angularVelocity,
                ftd: proj[codeNames.projectiles[10]],
                tr: proj[codeNames.projectiles[14]], // turn rate
                gs: proj[codeNames.projectiles[17]], // gravity scale
                er: proj[codeNames.projectiles[15]], // explode radius
                bb: proj[codeNames.projectiles[18]], // bullet bounces
                owner: proj[codeNames.projectiles[13]],
                round: proj[codeNames.projectiles[24]], // bullet round
                restitution: proj.restitution, // bullet restitution
                bc: proj[codeNames.projectiles[22]], // bounce count
                br: proj[codeNames.projectiles[6]], // bullet radius
            }
            newState.projectiles[id] = newProj;
        }
    }
    for (let id in newState.all[13]) {
        if (codeNames.general && newState.all[13][id]) {
            let flag = newState.all[13][id];
            if (!codeNames.flags) {
                let constructor = String(flag.constructor);
                let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
                let m = [];
                for (let i of matches) {
                    m.push(i.split("this.")[1].split("=")[0]);
                }
                let t = [''];
                for (let i in m) {
                    t.push(m[i]);
                }
                codeNames.flags = t;
            }
            flag.p = [flag.x, flag.y];
            flag.capFrames = flag[codeNames.flags[7]];
            flag.capLimit = flag[codeNames.flags[6]];
            flag.takenBy = flag[codeNames.flags[5]];
        }
    }
    newState.flags = newState.all[13];
    for (let id in newState.cubes) {
        let cube = newState.cubes[id];
        if (!codeNames.general) {
            let constructor = String(cube.constructor);
            let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
            let m = [];
            for (let i of matches) {
                m.push(i.split("this.")[1].split("=")[0]);
            }
            let t = [''];
            for (let i in m) {
                t.push(m[i]);
            }
            codeNames.general = t;
            codeNames.lv = [codeNames.general[4], codeNames.general[5]]
        }
        cube.p = [cube.x, cube.y];
        cube.lv = [cube[codeNames.lv[0]], cube[codeNames.lv[1]]];
        cube.st = cube[codeNames.general[21]];
        cube.team = cube[codeNames.general[9]];
        cube.ff = cube[codeNames.general[15]];
        cube.dj = cube[codeNames.general[10]];
        cube.rf = cube[codeNames.general[30]];
        cube.hp = cube[codeNames.general[8]];
        cube.ra = cube[codeNames.general[31]];
        cube.stepsSurvived = cube[codeNames.general[14]];
        cube.iframes = Math.max(0, cube[codeNames.general[13]] - 1);
        cube.ba = cube[codeNames.general[25]];
        cube.bf = cube[codeNames.general[24]];
        cube.a = cube.angle;
        cube.av = cube.angularVelocity;
        delete cube.angle;
        delete cube.angularVelocity;
        delete cube[codeNames.general[21]];
        delete cube[codeNames.general[8]];
        delete cube[codeNames.general[14]];
        delete cube[codeNames.general[22]];
        delete cube[codeNames.lv[0]];
        delete cube[codeNames.lv[1]];
        delete cube.x;
        delete cube.y;
    }
    for (let id in newState.all[4]) {
        let info = newState.all[4][id];
        if (!codeNames.deathReg) {
            let constructor = String(info.constructor);
            let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
            let m = [];
            for (let i of matches) {
                m.push(i.split("this.")[1].split("=")[0]);
            }
            let t = [];
            for (let i in m) {
                t.push(m[i]);
            }
            codeNames.deathReg = t;
        }
        let playerData = info[codeNames.deathReg[10]];
        let finalPlrData = {};
        for (let id2 in playerData) {
            let info2 = playerData[id2];
            if (info2) {
                if (!codeNames.playerReg) {
                    let constructor = String(info2.constructor);
                    let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
                    let m = [];
                    for (let i of matches) {
                        m.push(i.split("this.")[1].split("=")[0]);
                    }
                    let t = [];
                    for (let i in m) {
                        t.push(m[i]);
                    }
                    codeNames.playerReg = t;
                }
                info2.lives = info2[codeNames.playerReg[14]];
                info2.kills = info2[codeNames.playerReg[2]];
                info2.respawnIndex = info2[codeNames.playerReg[34]];
                info2.killedBy = info2[codeNames.playerReg[18]];
                info2.respawn = info2[codeNames.playerReg[12]];
            }
        }
        newState.playerData = playerData;
    }
    return newState;
}

function decodeState(state) {
    let newState = state;
    newState.all[8] = newState.cubes;
    for (let id in newState.projectiles) {
        let proj = newState.projectiles[id];
        let p = newState.all[9][id];
        if (proj && p && codeNames.general) {
            p.x = proj.p[0]
            p.y = proj.p[1]
            p[codeNames.lv[0]] = proj.lv[0]
            p[codeNames.lv[1]] = proj.lv[1]
            p.angle = proj.a;
            p.angularVelocity = proj.av;
            p[codeNames.projectiles[10]] = proj.ftd;
            p[codeNames.projectiles[14]] = proj.tr; // turn rate
            p[codeNames.projectiles[17]] = proj.gs; // gravity scale
            p[codeNames.projectiles[15]] = proj.er; // explode radius
            p[codeNames.projectiles[18]] = proj.bb; // bullet bounces
            p[codeNames.projectiles[13]] = proj.owner;
            p[codeNames.projectiles[24]] = proj.round; // bullet round
            p.restitution = proj.restitution; // bullet restitution
            p[codeNames.projectiles[22]] = proj.bc; // bounce count
            p[codeNames.projectiles[6]] = proj.br; // bullet radius
        }
    }
    delete newState.projectiles;
    newState.all[13] = newState.flags;
    for (let id in newState.all[13]) {
        if (codeNames.general && newState.all[13][id]) {
            let flag = newState.all[13][id];
            if (!codeNames.flags) {
                let constructor = String(flag.constructor);
                let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
                let m = [];
                for (let i of matches) {
                    m.push(i.split("this.")[1].split("=")[0]);
                }
                let t = [''];
                for (let i in m) {
                    t.push(m[i]);
                }
                codeNames.flags = t;
            }
            if (flag.p) {
                flag.x = flag.p[0];
                flag.y = flag.p[1];
                flag[codeNames.flags[7]] = flag.capFrames;
                flag[codeNames.flags[6]] = flag.capLimit;
                flag[codeNames.flags[5]] = flag.takenBy;
            }
        }
    }
    for (let id in newState.all[8]) {
        let cube = newState.all[8][id];
        if (!codeNames.general) {
            let constructor = String(cube.constructor);
            let matches = constructor.match(/this\..{0,2}=(.*?);/ig);
            let m = [];
            for (let i of matches) {
                m.push(i.split("this.")[1].split("=")[0]);
            }
            let t = [''];
            for (let i in m) {
                t.push(m[i]);
            }
            codeNames.general = t;
            codeNames.lv = [codeNames.general[4], codeNames.general[5]]
        }
        cube.x = cube.p[0];
        cube.y = cube.p[1];
        cube[codeNames.lv[0]] = cube.lv[0];
        cube[codeNames.lv[1]] = cube.lv[1];
        cube.angularVelocity = cube.av;
        cube[codeNames.general[10]] = cube.dj;
        cube[codeNames.general[8]] = cube.hp;
        cube[codeNames.general[13]] = cube.iframes;
        cube[codeNames.general[21]] = cube.st;
        cube[codeNames.general[15]] = cube.ff;
        cube[codeNames.general[9]] = cube.team;
        cube[codeNames.general[30]] = cube.rf;
        cube[codeNames.general[31]] = cube.ra;
        cube[codeNames.general[14]] = cube.stepsSurvived;
        cube[codeNames.general[25]] = cube.ba;
        cube[codeNames.general[24]] = cube.bf;
        cube.angle = cube.a;
        delete cube.a;
        delete cube.av;
        delete cube.stepsSurvived;
        delete cube.st;
        delete cube.dj;
        delete cube.iframes;
        delete cube.lv;
        delete cube.hp;
        delete cube.p;
        delete cube.ba;
        delete cube.bf;
        delete cube.ra;
        delete cube.rf;
        delete cube.ff;
        delete cube.team;
    }

    for (let id in newState.playerData) {
        let info = newState.playerData[id];
        if (info) {
            info[codeNames.playerReg[14]] = info.lives;
            info[codeNames.playerReg[12]] = info.respawn;
        }
    }
    for (let i in newState.all[4]) {
        if (newState.all[4][i]) {
            newState.all[4][i][codeNames.deathReg[10]] = newState.playerData;
        }
    }
    return newState;
}
        
function loadKeys(classi, typ) {
    let cons = String(classi.constructor);
    let defines = (cons.split("constructor() {")[1]).split("this.");
    let m = [];
    for (let i of defines) {
        m.push(i.split("=")[0]);
    }
    codeNames.keys = m;
}

function makeInputs(frame, cubes) {
    let inputs = stateMaker[codeNames.simulation[1]][codeNames.simulation[2]](frame, true);
    let ts = stateMaker[codeNames.simulation[1]].get(-1);
    if (!codeNames.keys && ts) {
        loadKeys(ts);
        codeNames.keySample = ts;
    }
    if (inputs) {
        let array = [];
        for (let id in inputs) {
            array[id] = {
                left: inputs[id].left,
                right: inputs[id].right,
                up: inputs[id][codeNames.keys[3]],
                down: inputs[id][codeNames.keys[4]],
                action3: inputs[id][codeNames.keys[7]], // BAT
                action4: inputs[id][codeNames.keys[6]], // ROCKET
                action2: inputs[id][codeNames.keys[8]], // GRAB
                action1: inputs[id][codeNames.keys[5]] // FP
            }
        }
        for (let id in cubes) {
            if (cubes[id]) {
                if (!array[id]) {
                    array[id] = {
                        left: false,
                        right: false,
                        up: false,
                        down: false,
                        action3: false, // BAT
                        action4: false, // ROCKET
                        action2: false, // GRAB
                        action1: false // FP
                    }
                }
            }
        }
        return array;
    }
}
        var blocklyWorkspace;
const editor = document.createElement('div');
editor.style = "opacity: 1; position: absolute; top: calc(50% - 40%); left: calc(50% - 45%); width: 90%; height: 80%; background-color: #212121; border-radius: 7px;";
const topBar = document.createElement('div');
topBar.classList.add("topBar");
topBar.textContent = "Editor";
editor.appendChild(topBar);
document.getElementById("appContainer").appendChild(editor);
const editorBox = document.createElement(`div`);
editorBox.style = "color-scheme: only light; background: #ffffff; overflow: hidden; border-radius: 8px; width: calc(100% - 90px); right: 40px; height: calc(100% - 60px); top: 50px; position: absolute;";
editor.appendChild(editorBox);
editorBox.style.display = 'none';
const blocklyBox = document.createElement(`div`);
blocklyBox.style = "overflow: hidden; border-radius: 8px; width: calc(100% - 90px); right: 40px; height: calc(100% - 60px); top: 50px; position: absolute;";
editor.appendChild(blocklyBox);
editor.style.display = 'none';
const checkButton = document.createElement('div');
checkButton.classList.add("crossButton");
editor.appendChild(checkButton);
const exportButton = document.createElement('div');
exportButton.classList.add("crossButton");
exportButton.style.left = "15px";
exportButton.style.top = "50px";
exportButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmeexport.png?raw=true)";
editor.appendChild(exportButton);
const jsButton = document.createElement('div');
jsButton.classList.add("crossButton");
jsButton.style.right = "15px";
jsButton.style.top = "50px";
jsButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmejavascript.png?raw=true)";
editor.appendChild(jsButton);
const importButton = document.createElement('div');
importButton.classList.add("crossButton");
importButton.style.left = "15px";
importButton.style.top = "80px";
importButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmedownload.png?raw=true)";
editor.appendChild(importButton);
exportButton.onclick = () => {
    if (window.monacoEditor) {
        let text = `
  {
  jsSwitch: ${jsSwitch};
  [CODE]
  > \`\`\`;${jsSwitch ? window.monacoEditor.getValue() : '// no js'}> \`\`\`;
  [BLOCKLY]
  > \`\`\`;${(new XMLSerializer().serializeToString(Blockly.Xml.workspaceToDom(blocklyWorkspace)))}> \`\`\`;
  }
  `
        let element = document.createElement('a');
        let file = new Blob([text], { type: "text/plain" })

        let url = URL.createObjectURL(file);
        element.setAttribute('href', url);
        element.setAttribute('download', (prompt("Name of the file") || "ngmm export") + ".ngmm");
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}
jsButton.onclick = () => {
    jsSwitch = !jsSwitch;
    if (jsSwitch) {
        blocklyBox.style.display = 'none';
        editorBox.style.display = 'block';
    } else {
        blocklyBox.style.display = 'block';
        editorBox.style.display = 'none';
    }
}
importButton.onclick = () => {
    if (window.monacoEditor) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ngmm';

        input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                let decoded = content;
                try {
                    decoded = decodeURIComponent(window.atob(content));
                } catch (err) {

                }
                let firstStep = decoded.match(/\[CODE\](.*?)> ```;(.*?)> ```;/gims)[0].split('> ```;');
                let finalCode = '';
                let switchTxt = decoded.match(/jsSwitch\: (.*?);/ig);
                if (switchTxt) {
                    try {
                        switchTxt = switchTxt[0];
                        let switcc = switchTxt.split(": ")[1].split(";")[0];
                        jsSwitch = switcc == "true";
                        if (jsSwitch) {
                            blocklyBox.style.display = 'none';
                            editorBox.style.display = 'block';
                        } else {
                            blocklyBox.style.display = 'block';
                            editorBox.style.display = 'none';
                        }
                    } catch (error) {

                    }
                }
                for (let i in firstStep) {
                    if (i > 0 && i < firstStep.length) {
                        finalCode += firstStep[i];
                    }
                }
                let firstStep2 = decoded.match(/\[BLOCKLY\](.*?)> ```;(.*?)> ```;/gims);
                if (firstStep2) {
                    firstStep2 = firstStep2[0].split('> ```;');
                    let finalCode2 = '';
                    for (let i in firstStep2) {
                        if (i > 0 && i < firstStep2.length) {
                            finalCode2 += firstStep2[i];
                        }
                    }
                    blocklyWorkspace.clear();
                    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(finalCode2), blocklyWorkspace)
                }
                window.monacoEditor.setValue(finalCode);
            }
        }

        input.click();
    }
}
checkButton.onclick = () => {
    if (window.monacoEditor) {
        let markers = monaco.editor.getModelMarkers({ owner: "javascript" }).filter(a => a.severity >= 5);
        if (markers[0] && jsSwitch) {
            //console.log(markers[0]);
            window.monacoEditor.revealLine(markers[0].endLineNumber);
            window.monacoEditor.setPosition({ lineNumber: markers[0].endLineNumber, column: markers[0].endColumn });
            return;
        }
        else {
            document.getElementsByClassName("lobbyContainer")[0].style.display = "block";
            let code = window.monacoEditor.getValue();
            if (!jsSwitch) {
                code = javascript.javascriptGenerator.workspaceToCode(blocklyWorkspace)
            }
            defineGMM(code);
        }
    }
    editor.style.display = "none";
}
new Promise(async (r) => {
    const thisId = setInterval(() => {
        if (window.monaco) {
            let libUri = "ts:filename/facts.d.ts";
            monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
            monaco.editor.createModel(libSource, "typescript", monaco.Uri.parse(libUri));

            monaco.editor.setTheme('vs')

            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: false,
            });

            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES6,
                allowNonTsExtensions: true
            });

            window.monacoEditor = monaco.editor.create(editorBox, {
                value: `
// Sword replaces Bat gmm

// insert id, then url
game.graphics.loadTexture("sus","https://upload.wikimedia.org/wikipedia/commons/d/df/Sword_Pixel_art_-_Radin.png");
game.events.add("step4each",(id) => {
	let cube = game.state.cubes[id];
	if (cube) {
		let g = game.graphics.drawings[game.vars[id]];
		let add = cube.bf <= 8? 0 : Math.PI;
		g.shapes[0].alpha = cube.bf > 0? 1 : 0;
		g.a = cube.ba+add;
	}
})

game.events.add("init4each",(id) => {
		game.vars[id] = game.graphics.create({
			p: [0,0],
			attach: "cube",
			attachId: id,
			scale: [1,1],
            fixedAngle: true,
			a: 0,
			shapes: [
				{
					type: "im",
					text: (id == game.clientId? "YOU" : "OTHER")+(game.clientId == game.hostId? " HOST" : " NOT HOST"),
					color: 0xffffff,
					a: 45*Math.PI/180+Math.PI,
					p: [-1,0],
					size: [1.4,1.4],
					// set the id of the image to the id of the url you set
					id: "sus"
				}
			]
		})
})`,
                automaticLayout: true,
                language: 'javascript'
            });
            clearInterval(thisId);
            r();
        }
    }, 10);
})
    .then(r => {
        console.log("monaco loaded");
        //  appendScript("https://unpkg.com/blockly/blocks_compressed.js");
        //  appendScript("https://unpkg.com/blockly/javascript_compressed.js");
        new Promise(async (r) => {
            const thisId = setInterval(async () => {
                if (window.Blockly) {
                    let jsb = javascript.javascriptGenerator;
                    let js = Blockly.JavaScript;
                    let theme = Blockly.Theme.defineTheme('dark', {
                        base: Blockly.Themes.Classic,
                        componentStyles: {
                            workspaceBackgroundColour: '#1e1e1e',
                            toolboxBackgroundColour: 'blackBackground',
                            toolboxForegroundColour: '#fff',
                            flyoutBackgroundColour: '#252526',
                            flyoutForegroundColour: '#ccc',
                            flyoutOpacity: 1,
                            scrollbarColour: '#797979',
                            insertionMarkerColour: '#fff',
                            insertionMarkerOpacity: 0.3,
                            scrollbarOpacity: 0.4,
                            cursorColour: '#d0d0d0',
                            blackBackground: '#333',
                        },
                    });
                    blocklyWorkspace = Blockly.inject(blocklyBox, {
                        toolbox: blocklyDefs,
                        trashcan: true,
                        theme: theme,
                        renderer: 'zelos',
                        grid:
                        {
                            spacing: 50,
                            length: 4,
                            colour: '#ccc',
                            snap: false
                        },
                        zoom: {
                            controls: true,
                            wheel: true,
                            startScale: 1.0,
                            maxScale: 3,
                            minScale: 0.3,
                            scaleSpeed: 1.2,
                            pinch: true
                        },
                    });
                    clearInterval(thisId);
                    r();
                }
            }, 10);
        })
            .then(r => {
                console.log("blockly loaded");
            })
    })
//<textarea class="scrollBox" wrap="soft" spellcheck="false" style="border: none; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; position: absolute; overflow-y: scroll; overflow-x: hidden; background-color: #2f2f2f; height: calc(100% - 60px); width: calc(100% - 80px); left: 80px; top: 50px; box-sizing: border-box; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px; white-space: nowrap;"></textarea>
        let jsb = javascript.javascriptGenerator;
        let js = Blockly.JavaScript;
        function createEventBlock(id, varIds, init) {
    Blockly.Blocks[id] = {
        init: init,
        withLexicalVarsAndPrefix: function (_, proc) {
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) proc(varField, this.lexicalVarPrefix);
            }
        },
        getVars: function () {
            const finalList = [];

            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) finalList.push(varField);
            }
            return finalList;
        },
        blocksInScope: function () {
            const doBlock = this.getInputTargetBlock('code');
            if (doBlock) {
                return [doBlock];
            } else {
                return [];
            }
        },
        declaredNames: function () {
            const finalList = [];

            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) finalList.push(varField);
            }
            return finalList;
        },
        renameVar: function (oldName, newName) {
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (Blockly.Names.equals(oldName, varField)) {
                    this.setFieldValue(newName, varIds[i]);
                }
            }
        },
        renameBound: function (boundSubstitution, freeSubstitution) {
        },
        renameFree: function (freeSubstitution) {
        },
        freeVariables: function () { // return the free variables of this block
            const result = LexicalVariable.freeVariables(
                this.getInputTargetBlock('code'));
            // Remove bound index variable from body free vars
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) result.deleteName(varField);
            }
            if (this.nextConnection) {
                const nextBlock = this.nextConnection.targetBlock();
                result.unite(LexicalVariable.freeVariables(nextBlock));
            }
            return result;
        },
    };
};

createEventBlock('event_init', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('on round start');
    this.appendDummyInput()
        .appendField('run per player? (get local (cube_id))')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'perplayer');
    this.appendStatementInput('code');
    this.setColour(160);
    this.lexicalVarPrefix = 'event_init';

    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('event_step', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('on each step');
    this.appendDummyInput()
        .appendField('run per player? (get local (cube_id))')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'perplayer');
    this.appendStatementInput('code');
    this.setColour(160);
    this.lexicalVarPrefix = 'event_step';

    if (this.validatorInit) {
        this.validatorInit();
    }
});

let cubeOPT = [
    ['position', '.p'],
    ['position X', '.p[0]'],
    ['position Y', '.p[0]'],
    ['velocity', '.lv'],
    ['velocity X', '.lv[0]'],
    ['velocity Y', '.lv[1]'],
    ['angle', '.a'],
    ['angular velocity', '.av'],
    ['double jump', '.dj'],
    ['health', '.hp'],
    ['iframes', '.iframes'],
    ['team', '.team'],
];

Blockly.Blocks["cube_get"] = {
    init: function() {
        this.appendDummyInput()
            .appendField('Get')
            .appendField(new Blockly.FieldDropdown(cubeOPT), 'info');
        this.appendValueInput('PLRID')
            .appendField(' of cube');
        this.setColour(160);
        this.lexicalVarPrefix = 'cube_get';
        this.setOutput(true);

        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["cube_exist"] = {
    init: function () {
        this.appendValueInput('PLRID')
            .appendField('Does this cube exist');
        this.setColour(160);
        this.lexicalVarPrefix = 'cube_exist';
        this.setOutput(true);

        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["cube_set"] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Set')
            .appendField(new Blockly.FieldDropdown(cubeOPT), 'info');
        this.appendValueInput('PLRID')
            .appendField(' of cube');
        this.appendValueInput('VALUE')
            .appendField('To');
        this.setColour(160);
        this.lexicalVarPrefix = 'cube_set';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

let keys = [
    ['Up key', 'up'],
    ['Down key', 'down'],
    ['Left key', 'left'],
    ['Right key', 'right'],
    ['Action1 key', 'action1'],
    ['Action2 key', 'action2'],
    ['Action3 key', 'action3'],
    ['Action4 key', 'action4'],
]

Blockly.Blocks["input_get"] = {
    init: function () {
        this.appendValueInput('PLRID')
            .appendField(' is cube ');
        this.appendDummyInput()
            .appendField('\'s')
            .appendField(new Blockly.FieldDropdown(keys), 'info')
            .appendField('down?')
        this.setColour(160);
        this.lexicalVarPrefix = 'input_get';
        this.setOutput(true);

        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["input_override"] = {
    init: function() {
        this.appendValueInput('PLRID')
            .appendField('Set cube ');
        this.appendDummyInput()
            .appendField('\'s')
            .appendField(new Blockly.FieldDropdown(keys), 'info');
        this.appendValueInput('VALUE')
            .setCheck("Boolean")
            .appendField('To');
        this.setColour(160);
        this.lexicalVarPrefix = 'input_override';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["input_no_override"] = {
    init: function() {
        this.appendValueInput('PLRID')
            .appendField('Stop overriding cube ');
        this.appendDummyInput()
            .appendField('\'s')
            .appendField(new Blockly.FieldDropdown(keys), 'info');
        this.setColour(160);
        this.lexicalVarPrefix = 'input_no_override';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["define_local"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Define local variable")
            .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME');
        this.appendValueInput('VALUE')
            .appendField("As");
        this.setColour(160);
        this.lexicalVarPrefix = 'define_get';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["set_local"] = {
    init: function() {
        this.appendValueInput('VALUE')
            .appendField("Set local variable")
            .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME')
            .appendField("To");
        this.setColour(160);
        this.lexicalVarPrefix = 'define_get';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["get_local"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get local variable")
            .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME');
        this.setColour(160);
        this.lexicalVarPrefix = 'get_local';
        this.setOutput(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["define_group"] = {
    init: function() {
        this.appendValueInput('GROUP')
            .appendField("Start group")
        this.setColour(160);
        this.lexicalVarPrefix = 'define_group';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["set_group"] = {
    init: function() {
        this.appendValueInput('GROUP')
            .appendField("Set group")
        this.appendValueInput('VALUE')
            .appendField("'s")
            .appendField(new Blockly.FieldTextInput('variable'), 'VAR')
            .appendField("To");
        this.setColour(160);
        this.lexicalVarPrefix = 'get_local';
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

Blockly.Blocks["get_group"] = {
    init: function() {
        this.appendValueInput('GROUP')
            .appendField("Get group")
        this.appendDummyInput()
            .appendField("'s")
            .appendField(new Blockly.FieldTextInput('variable'), 'VAR');
        this.setColour(160);
        this.lexicalVarPrefix = 'get_local';
        this.setOutput(true);

        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}

let vector_math = [
    ['Add', 'add'],
    ['Subtract', 'sub'],
    ['Multiply', 'mult'],
    ['Divide', 'div'],
    ['Dot product of', 'dot']
]
let vector_math2 = [
    ['Magnitude', 'magn'],
    ['Angle of', 'angleOf'],
    ['Normalize', 'norm']
]


Blockly.Blocks["vector"] = {
    init: function() {
        this.appendValueInput('X')
            .appendField('Vector X')
        this.appendValueInput('Y')
            .appendField('Y')
        this.setColour(270);
        this.lexicalVarPrefix = 'vector';
        this.setOutput(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}
Blockly.Blocks["vector_math"] = {
    init: function() {
        this.appendValueInput('A')
            .appendField(new Blockly.FieldDropdown(vector_math), 'operation')
        this.appendValueInput('B')
            .appendField("and");
        this.setColour(270);
        this.lexicalVarPrefix = 'vector';
        this.setOutput(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
}
Blockly.Blocks["vector_math2"] = {
    init: function() {
        this.appendValueInput('A')
            .appendField(new Blockly.FieldDropdown(vector_math2), 'operation')
        this.setColour(270);
        this.lexicalVarPrefix = 'vector';
        this.setOutput(true);
        if (this.validatorInit) {
            this.validatorInit();
        }
    }
};
        jsb['event_init'] = function (block) {
    let perplayer = block.getFieldValue('perplayer') === 'TRUE';
    let player_id = block.getFieldValue('player_id');
    let insideCode = jsb.statementToCode(block, 'code');

    let code = `game.events.add('${perplayer ? 'init4each' : 'init'}', function(${perplayer ? 'cube_id' : ''}) {\n`;

    if (insideCode.includes('$')) {
        code += gameVarShort;
    }

    code += `${insideCode}});\n\n`;

    return code;
};

jsb['event_step'] = function (block) {
    let perplayer = block.getFieldValue('perplayer') === 'TRUE';
    let player_id = block.getFieldValue('player_id');
    let insideCode = jsb.statementToCode(block, 'code');

    let code = `game.events.add('${perplayer ? 'step4each' : 'step'}', function(${perplayer ? 'cube_id' : ''}) {\n`;

    if (insideCode.includes('$')) {
        code += gameVarShort;
    }

    code += `${insideCode}});\n\n`;

    return code;
};

jsb['cube_get'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.state.cubes[${player_id}]${info}`

    return [code, js.ORDER_NONE];
};

jsb['cube_exist'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);

    let code = `(game.state.cubes[${player_id}]? true : false)`;

    return [code, js.ORDER_NONE];
};

jsb['cube_set'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')
    let value = jsb.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let code = `game.state.cubes[${player_id}]${info} = ${value};\n`

    return code;
};

jsb['input_override'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')
    let value = jsb.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let code = `game.inputs[${player_id}].${info} = ${value};\n`

    return code;
};

jsb['input_no_override'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.inputs[${player_id}].${info} = null;\n`

    return code;
};

jsb['input_get'] = function (block) {
    let player_id = jsb.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.inputs[${player_id}].${info}`

    return [code, js.ORDER_NONE];
};

jsb['define_local'] = function (block) {
    let value = jsb.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR_NAME')

    let code = `let ${varname} = ${value};\n`

    return code;
};

jsb['set_local'] = function (block) {
    let value = jsb.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR_NAME')

    let code = `${varname} = ${value}\n;`

    return code;
};

jsb['get_local'] = function (block) {
    let varname = block.getFieldValue('VAR_NAME')

    let code = `${varname}`

    return [code, js.ORDER_NONE];
};

jsb['define_group'] = function (block) {
    let group = jsb.valueToCode(block, "GROUP", js.ORDER_ADDITION);

    let code = `game.vars[${group}] = {};\n`

    return code;
};

jsb['get_group'] = function (block) {
    let group = jsb.valueToCode(block, "GROUP", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR')

    let code = `game.vars[${group}].${varname}`

    return [code, js.ORDER_NONE];
};

jsb['set_group'] = function (block) {
    let group = jsb.valueToCode(block, "GROUP", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR')
    let value = jsb.valueToCode(block, "VALUE", js.ORDER_ADDITION);

    let code = `game.vars[${group}].${varname} = ${value};\n`

    return code;
};

jsb['vector_math'] = function (block) {
    let operation = block.getFieldValue('operation');
    let A = jsb.valueToCode(block, "A", js.ORDER_NONE);
    let B = jsb.valueToCode(block, "B", js.ORDER_NONE);

    let code = `game.Vector.${operation}(${A},${B})`;

    return [code, js.ORDER_NONE];
};
jsb['vector_math2'] = function (block) {
    let operation = block.getFieldValue('operation');
    let A = jsb.valueToCode(block, "A", js.ORDER_NONE);

    let code = `game.Vector.${operation}(${A})`;

    return [code, js.ORDER_NONE];
};
jsb['vector'] = function (block) {
    let x = jsb.valueToCode(block, "X", js.ORDER_NONE);
    let y = jsb.valueToCode(block, "Y", js.ORDER_NONE);

    let code = `[${x},${y}]`;

    return [code, js.ORDER_NONE];
};;
        let lastPixiContainer = null;

const createGraphics = (info) => {
    let id = game.state.graphics.index;
    game.state.graphics.index++;
    game.state.graphics.drawings[id] = info;
    return id;
}

function updateDrawings(dt) {
    if (gmm.enabled) {
        if (document.getElementById('backgroundImage') && lastPixiContainer && game.state && game.prevState && game.prevState.graphics && game.state.graphics) {
            let bg = document.getElementById('backgroundImage')
            let w = bg.offsetWidth;
            let h = bg.offsetHeight;
            let mps = 35 / ((game.state.settings[0][codeNames.settings[2]]) / 35);
            if (!lastPixiContainer.sortableChildren) {
                lastPixiContainer.sortableChildren = true
            }
            for (let id in game.prevState.graphics.drawings) {
                let p = game.state.graphics.drawings[id];
                if (!p) {
                    if (gmm.pixi[id]) {
                        gmm.pixi[id].container.destroy();
                        delete gmm.pixi[id];
                    }
                }
            }
            for (let id in game.state.graphics.drawings) {
                let pi = game.prevState.graphics.drawings[id];
                let p = game.state.graphics.drawings[id];
                if (p) {
                    if (!gmm.pixi[id]) {
                        let obj = new window.PIXI.Container();
                        lastPixiContainer.addChild(obj);
                        gmm.pixi[id] = { container: obj, children: {} };
                        obj.zIndex = 100000;
                    }
                    let offsetX = 0;
                    let offsetY = 0;
                    let offsetXL = 0;
                    let offsetYL = 0;
                    let offsetAngle = 0;
                    if (p.attach == "cube") {
                        let alive = retrieveAllPlayers();
                        if (alive[p.attachId]) {
                            if (!gmm.pixi[id].container.parent || gmm.pixi[id].container.parent != alive[p.attachId].obj) {
                                gmm.pixi[id].container.parent?.removeChild(gmm.pixi[id].container);
                                alive[p.attachId].obj.addChild(gmm.pixi[id].container);
                                gmm.pixi[id].container.zIndex = p.behind ? -10 : 10;
                                alive[p.attachId].obj.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex);
                            }
                        }
                        if (game.state.cubes[p.attachId]) {
                            gmm.pixi[id].container.visible = true;
                            let c = game.state.cubes[p.attachId];
                            offsetX = c.x;
                            offsetY = c.y;
                            offsetXL = c.x;
                            offsetYL = c.y;
                            offsetAngle = p.fixedAngle ? 0 : c.angle;
                        } else {
                            gmm.pixi[id].container.visible = false;
                        }
                        if (game.prevState.cubes[p.attachId]) {
                            let c = game.prevState.cubes[p.attachId];
                            offsetXL = c.x;
                            offsetYL = c.y;
                        }
                    } else {
                        if (!gmm.pixi[id].container.parent || gmm.pixi[id].container.parent != lastPixiContainer) {
                            gmm.pixi[id].container.parent?.removeChild(gmm.pixi[id].container);
                            lastPixiContainer.addChild(gmm.pixi[id].container);
                        }
                    }
                    let x = (p.p[0]) * 100;
                    let y = (p.p[1]) * 100;
                    gmm.pixi[id].container.x = (((((x / 35) * mps) / 35) * w) / 100);
                    gmm.pixi[id].container.y = (((((y / 35) * mps) / 35) * w) / 100);
                    gmm.pixi[id].container.rotation = offsetAngle + (p.a || 0);
                    if (pi) {
                        for (let shapeId in pi.shapes) {
                            let shape = p.shapes[shapeId];
                            if (!shape) {
                                gmm.pixi[id].children[shapeId].destroy();
                                delete gmm.pixi[id].children[shapeId];
                            }
                        }
                    }
                    for (let shapeId in p.shapes) {
                        let shape = p.shapes[shapeId];
                        let shapel = pi?.shapes[shapeId];
                        if (shape) {
                            if (!gmm.pixi[id].children[shapeId]) {
                                if (shape.type == "bx") {
                                    // Box shape
                                    let obj = new window.PIXI.Sprite(window.PIXI.Texture.WHITE);
                                    obj.anchor.x = 0.5;
                                    obj.anchor.y = 0.5;
                                    gmm.pixi[id].container.addChild(obj);
                                    gmm.pixi[id].children[shapeId] = obj;
                                }
                                else if (shape.type == "ci") {
                                    // Circle shape
                                    let obj = new window.PIXI.Graphics();
                                    obj.beginFill(0xffffff);
                                    obj.drawCircle(0, 0, 30);
                                    gmm.pixi[id].container.addChild(obj);
                                    gmm.pixi[id].children[shapeId] = obj;
                                }
                                else if (shape.type == "im") {
                                    // Image shape
                                    let obj;
                                    if (gmmTextures[shape.id] && gmmTextures[shape.id].valid) {
                                        obj = new window.PIXI.Sprite(new window.PIXI.Texture(gmmTextures[shape.id].baseTexture));
                                    } else {
                                        obj = new window.PIXI.Sprite(window.PIXI.Texture.WHITE);
                                        obj.texture.isWhite = true;
                                    }
                                    obj.anchor.x = 0.5;
                                    obj.anchor.y = 0.5;
                                    gmm.pixi[id].container.addChild(obj);
                                    gmm.pixi[id].children[shapeId] = obj;
                                }
                                else if (shape.type == "tx") {
                                    // Text shape
                                    let obj = new window.PIXI.Text('', {
                                        fontFamily: 'Arial',
                                        fontSize: 24,
                                        fill: 0xffffff,
                                        align: 'center',
                                    });
                                    obj.anchor.x = 0.5;
                                    obj.anchor.y = 0.5;
                                    gmm.pixi[id].container.addChild(obj);
                                    gmm.pixi[id].children[shapeId] = obj;
                                }
                            }
                            let obj = gmm.pixi[id].children[shapeId];
                            obj.alpha = "alpha" in shape ? shape.alpha : 1;
                            obj.tint = shape.color;
                            obj.rotation = shape.a || 0;
                            if (shape.type == "tx") {
                                obj.text = shape.text;
                                obj.style.fontSize = ((((shape.size / 35) * mps) / 35) * w) * p.scale[0];
                            } else {
                                obj.width = ((((shape.size[0] / 35) * mps) / 35) * w) * p.scale[0];
                                obj.height = ((((shape.size[1] / 35) * mps) / 35) * w) * p.scale[1];
                            }
                            let x = shape.p[0] * 100;
                            let y = shape.p[1] * 100;
                            obj.x = lerpNumber(obj.x, (((((x / 35) * mps) / 35) * w) * p.scale[0]) / 100, 1 - ((1 / 100 ** 10) ** dt));
                            obj.y = lerpNumber(obj.y, (((((y / 35) * mps) / 35) * w) * p.scale[1]) / 100, 1 - ((1 / 100 ** 10) ** dt));
                            if (shape.type == "im") {
                                if (shapel && shapel.id != shape.id || obj.texture.isWhite) {
                                    if (gmmTextures[shape.id] && gmmTextures[shape.id].valid) {
                                        obj.texture = new window.PIXI.Texture(gmmTextures[shape.id].baseTexture);
                                        obj.texture.requiresUpdate = true;
                                        obj.texture.updateUvs();
                                    }
                                }

                                if (obj.texture.noFrame) {
                                    obj.texture.frame = new window.PIXI.Rectangle(0, 0, obj.texture.baseTexture.width, obj.texture.baseTexture.height);
                                }
                                let ra = shapel ? shapel.region : null;
                                let rb = shape.region;
                                let regionAEqualB = (ra != null && rb != null) ?
                                    ra.pos[0] == rb.pos[0] &&
                                    ra.pos[1] == ra.pos[1] &&
                                    ra.size[0] == rb.size[0] &&
                                    ra.size[1] == ra.size[1] : (ra == null && rb == null);
                                if (regionAEqualB) {
                                    if (shape.region) {
                                        let frame = obj.texture.frame;
                                        frame.x = shape.region.pos[0];
                                        frame.y = shape.region.pos[1];
                                        frame.width = shape.region.size[0];
                                        frame.height = shape.region.size[1];
                                    } else {
                                        let frame = obj.texture.frame;
                                        frame.width = obj.texture.baseTexture.width;
                                        frame.height = obj.texture.baseTexture.height;
                                        frame.x = 0;
                                        frame.y = 0;
                                    }
                                    obj.texture.updateUvs();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function loadTextureGMM(id, url) {
    try {
        let img = new Image();
        img.src = url;
        window.PIXI.BaseImageResource.crossOrigin(img, url);
        img.onload = () => {
            let base = new window.PIXI.BaseTexture(img);
            let texture = new window.PIXI.Texture(base);
            gmmTextures[id] = texture;
        }
    } catch (error) {

    }
}
function playSoundGMM(id, volume) {
    let sound = gmmSounds[id];
    game.sound.step += 1;
    if (sound && (!game.state.soundStep || game.state.soundStep < game.sound.step)) {
        sound.volume(volume || 1)
        sound.play();
    }
    game.state.soundStep = Math.max(game.state.soundStep || 0, game.sound.step);
}
function loadSoundGMM(id, url) {
    try {
        let sound = new Howl({
            src: [url],
            html5: true
        });
        gmmSounds[id] = sound;
    } catch (error) {
        console.log("L", error)
    }
}
const lerpNumber = function (a, b, weight) {
    return ((1 - weight) * a + weight * b);
};
        stateMaker.mmR = stateMaker[codeNames.simulation[1]][codeNames.simulation[2]];
let inputsPropertie = null;
for (let i in stateMaker[codeNames.simulation[1]]) {
    if (stateMaker[codeNames.simulation[1]][i].constructor === Array) {
        inputsPropertie = i;
    }
}
stateMaker[codeNames.simulation[1]][codeNames.simulation[2]] = function (frame, noOverride) {
    let info = stateMaker.mmR.call(this, frame);
    if (gmm.enabled) {
        let state;
        try {
            state = getAllStates()[frame - 1];
        } catch (error) {
            WSS.onmessage({ data: `42[22]` });
            if (hostId == myid) {
                display("LEVEL 4 ERROR: " + error, "#ff0000", "#ff0000", true);
            }
            console.error(error);
            return;
        }
        if (codeNames.keySample && !noOverride) {
            let users = retrievePlayers();
            for (let i of users) {
                if (!info[i.id]) {
                    info[i.id] = new codeNames.keySample.constructor;
                }
                if (!this[inputsPropertie][i.id]) {
                    this[inputsPropertie][i.id] = [[]];
                }
                this[inputsPropertie][i.id][0] = info[i.id];
            }
        }
        if (state && gmm.applyOverrides && !noOverride) {
            let overrides = state.overrides;
            for (let i in info) {
                if (!overrides[i]) {
                    overrides[i] = {
                        left: null,
                        right: null,
                        up: null,
                        down: null,
                        action3: null,
                        action4: null,
                        action2: null,
                        action1: null
                    }
                }
            }
            for (let i in overrides) {
                if (info[i]) {
                    if (!codeNames.keys) {
                        loadKeys(info[i]);
                        codeNames.keySample = info[i];
                    }
                    info[i] = {
                        left: overrides[i].left != null ? overrides[i].left : info[i].left,
                        right: overrides[i].right != null ? overrides[i].right : info[i].right,
                        [codeNames.keys[3]]: overrides[i].up != null ? overrides[i].up : info[i][codeNames.keys[3]],
                        [codeNames.keys[4]]: overrides[i].down != null ? overrides[i].down : info[i][codeNames.keys[4]],
                        [codeNames.keys[7]]: overrides[i].action3 != null ? overrides[i].action3 : info[i][codeNames.keys[7]], // BAT
                        [codeNames.keys[6]]: overrides[i].action4 != null ? overrides[i].action4 : info[i][codeNames.keys[6]], // ROCKET
                        [codeNames.keys[8]]: overrides[i].action2 != null ? overrides[i].action2 : info[i][codeNames.keys[8]], // GRAB
                        [codeNames.keys[5]]: overrides[i].action1 != null ? overrides[i].action1 : info[i][codeNames.keys[5]] // FP
                    }
                }
            }
        }
    }
    return info;
}
stateMaker.rrP = stateMaker[codeNames.simulation[0]];
stateMaker[codeNames.simulation[0]] = function (frame) {
    gmm.applyOverrides = true;
    let simulated;
    if (gmm.enabled) {
        try {
            simulated = stateMaker.rrP.call(this, frame);
        } catch (error) {
            WSS.onmessage({ data: `42[22]` });
            if (hostId == myid) {
                display("LEVEL 2 ERROR: " + error, "#ff0000", "#ff0000", true);
            }
            console.error(error);
            return;
        }
        gmm.applyOverrides = false;
        try {
            let lc = getAllStates()[frame] || null;
            if (lc && !lc.vars) {
                lc.vars = {};
                lc.overrides = [];
                let users = retrievePlayers();
                for (let i of users) {
                    lc.overrides[i.id] = {
                        left: null,
                        right: null,
                        up: null,
                        down: null,
                        action3: null,
                        action4: null,
                        action2: null,
                        action1: null
                    }
                }
                lc.graphics = { create: createGraphics, index: 0, drawings: {}, loadTexture: loadTextureGMM };
                lc.sound = { load: loadSoundGMM, play: playSoundGMM, step: 0 };
            }
            if (lc) {
                simulated.vars = JSON.parse(JSON.stringify(lc.vars));
                simulated.overrides = JSON.parse(JSON.stringify(lc.overrides));
                simulated.graphics = { create: createGraphics, index: parseInt(lc.graphics.index.toString()), drawings: JSON.parse(JSON.stringify(lc.graphics.drawings)) };
                simulated.prevGraphics = { create: createGraphics, index: parseInt(lc.graphics.index.toString()), drawings: JSON.parse(JSON.stringify(lc.graphics.drawings)) };
            }
            if (!game.essential) {
                game.sound = { load: loadSoundGMM, play: playSoundGMM, step: 0 };
                game.world = { raycast: raycast };
                game.essential = true;
                game.Vector = vectorUtils;
            }
            game.state = encodeState(simulated);
            game.state.frames = frame;
            game.overrides = simulated.overrides;
            let seed = 0;
            seed = Number(frame);
            for (let a in game.state.cubes) {
                let i = game.state.cubes[a];
                if (i) {
                    seed += Math.floor(seed / 10);
                    seed += Math.floor((i.p[0] + i.p[1] + i.lv[0] + i.lv[1]) ** 2);
                    seed *= Math.floor((i.p[0] + i.p[1] + i.lv[0] + i.lv[1]) / 5);
                }
            }
            const rng = new SeedRandom(seed);
            game.Math.random = () => {
                if (game.state) {
                    return Math.round(rng(1000000000)) * 0.000000001;
                }
            }
            if (frame == 0) {
                game.clientId = myid;
                game.hostId = hostId;
                for (let i in gmm.pixi) {
                    gmm.pixi[i].container.destroy();
                    delete gmm.pixi[i];
                }

                game.graphics = { create: createGraphics, index: 0, drawings: {} };
                game.state.graphics = game.graphics;
                game.vars = {};
                for (let func of gmm.events.init) {
                    func();
                }
                for (let func of gmm.events.init4each) {
                    for (let id in game.state.playerData) {
                        try {
                            func(id);
                        }
                        catch (error) {
                            WSS.onmessage({ data: `42[22]` });
                            if (hostId == myid) {
                                display(error, "#ff0000", "#ff0000", true);
                            }
                        }
                    }
                }
                simulated.vars = game.vars;
                simulated.graphics = game.graphics;
            }
            game.prevState = lc ? encodeState(lc) : null;
            if (game.prevState) {
                game.prevState.frames = frame - 1;
            }
            game.inputs = makeInputs(frame, game.state.cubes);
            game.vars = simulated.vars;
            game.graphics = simulated.graphics;
            if (frame != 0) {
                for (let func of gmm.events.step) {
                    try {
                        func();
                    }
                    catch (error) {

                    }
                }
                for (let func of gmm.events.ondeath) {
                    if (game.prevState) {
                        for (let id in game.prevState.cubes) {
                            let cube = game.prevState.cubes[id];
                            if (cube && !game.state.cubes[id]) {
                                let revive = func(cube, game.state.playerData[id].killedBy)
                                if (revive) {
                                    let clone = Object.assign(Object.create(Object.getPrototypeOf(cube)), cube)
                                    clone.hp = 100;
                                    clone.stepsSurvived = 0;
                                    game.state.cubes[id] = clone;
                                    game.state.playerData[id].lives += 1;
                                    game.state.playerData[id].respawn = -1;
                                }
                            }
                        }
                    }
                }
                for (let func of gmm.events.step4each) {
                    for (let id in game.state.playerData) {
                        try {
                            func(id);
                        }
                        catch (error) {
                            WSS.onmessage({ data: `42[22]` });
                            if (hostId == myid) {
                                display("ERROR: " + error, "#ff0000", "#ff0000", true);
                            }
                            console.error(error);
                            return;
                        }
                    }
                }
            }
            simulated = decodeState(game.state);
            simulated.vars = game.vars;
            simulated.graphics = game.graphics;
            simulated.overrides = game.overrides;
            if (lc) {
                lc = decodeState(game.prevState);
            }
        } catch (error) {
            WSS.onmessage({ data: `42[22]` });
            if (hostId == myid) {
                display("ERROR: " + error, "#ff0000", "#ff0000", true);
            }
            console.error(error);
            return;
        }
        for (let i of gmm.destroyList) {
            b2World.DestroyBodo(i);
        }
        gmm.destroyList = [];
        for (let i of gmm.jointdestroyList) {
            b2World.DestroyJointo(i);
        }
        gmm.jointdestroyList = [];
    } else {
        simulated = stateMaker.rrP.call(this, frame);
    }
    return simulated;
}

     });
;
