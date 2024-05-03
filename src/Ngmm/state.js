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