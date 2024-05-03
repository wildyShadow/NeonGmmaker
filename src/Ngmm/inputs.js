
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