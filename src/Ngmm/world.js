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