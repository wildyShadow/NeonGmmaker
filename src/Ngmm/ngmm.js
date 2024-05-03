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
    var mod1 = 4294967087
    var mul1 = 65539
    var mod2 = 4294965887
    var mul2 = 65537
    if (typeof state1 != "number") {
        state1 = +new Date()
    }
    if (typeof state2 != "number") {
        state2 = state1
    }
    state1 = state1 % (mod1 - 1) + 1
    state2 = state2 % (mod2 - 1) + 1
    function random(limit) {
        state1 = (state1 * mul1) % mod1
        state2 = (state2 * mul2) % mod2
        if (state1 < limit && state2 < limit && state1 < mod1 % limit && state2 < mod2 % limit) {
            return random(limit)
        }
        return (state1 + state2) % limit
    }
    return random
}