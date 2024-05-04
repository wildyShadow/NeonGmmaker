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
            game.sound = { load: loadSoundGMM, play: playSoundGMM, step: 0 };
            game.world = { raycast: raycast };
            game.state = encodeState(simulated);
            game.state.frames = frame;
            game.Vector = vectorUtils;
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
                if (gmm.enabled) {
                    if (game.state) {
                        return Math.round(rng(1000000000)) * 0.000000001;
                    }
                } else {
                    return origRandom();
                }
            }
            if (frame == 1) {
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
                    for (let i of users) {
                        try {
                            func(i.id);
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
            if (frame > 1) {
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
                    for (let i of users) {
                        try {
                            func(i.id);
                        }
                        catch (error) {
                            WSS.onmessage({ data: `42[22]` });
                            if (hostId == myid) {
                                display("LEVEL 3 ERROR: " + error, "#ff0000", "#ff0000", true);
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
                display("LEVEL 1 ERROR: " + error, "#ff0000", "#ff0000", true);
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

//eval 
function getAllStates() {
    let state;
    for (let a in stateMaker) {
        let b = stateMaker[a];
        if (b.constructor.name == "Array") {
            for (let i of b) {
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
        return state;
    }
}

function setStates(states) {
    let state;
    for (let a in stateMaker) {
        let b = stateMaker[a];
        if (b.constructor.name == "Array") {
            for (let i of b) {
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
