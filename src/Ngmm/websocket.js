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