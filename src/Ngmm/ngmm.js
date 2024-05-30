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