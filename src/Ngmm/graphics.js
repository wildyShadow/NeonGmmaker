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
                        let alive = retrievePlayers();
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