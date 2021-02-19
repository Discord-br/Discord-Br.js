const WS = require("ws");

module.exports = class Websocket {
    constructor(client) {
        this.token;
        this.url = "wss://gateway.discord.gg/?v=8&encoding=json"
        this.ws;
        this.interval;
        this.client = client;
    }

    async connect(token) {
        this.token = token;

        this.ws = new WS(this.url);

        this.ws.on("open", async () => {
            this.ws.send(JSON.stringify({
                op: 2,
                d: {
                    token: this.token,
                    intents: 32767,
                    properties: {
                        $os: process.platform.toString(),
                        intents: 16384,
                        $browser: "discord-br.js",
                        $device: "discord-br.js"
                    },
                }
            }))
        })

        this.ws.on("message", async (msg) => {
            try {
                const payload = JSON.parse(msg.toString())
                const { t: event, s, op, d } = payload
                const heartbeat_interval = d.heartbeat_interval
                if(!heartbeat_interval){}
                switch (op) {
                    case 10:
                        this.interval = this.heartbeat(heartbeat_interval)
                        break;
                    case 0:
                        try {
                            const module = require(`../handlers/${event}.js`)
                            if (module) {
                                module(this.client, payload)
                            }
                        } catch (e) {
                        }
                        break;
                }
            } catch (e) {
            }
        })
    }

    heartbeat(ms = 1) {
        return setInterval(() => {
            this.ws.send(JSON.stringify({
                op: 1,
                d: null
            }))
        }, ms)
    }

    async identify() {
        const identify = {
            op: 2,
            d: {
                token: this.token,
                intents: 513,
                properties: {
                    $os: process.platform.toString(),
                    $browser: "discord-br.js",
                    $device: "discord-br.js"
                }
            }
        }
        this.ws.send(JSON.stringify(identify))
        return;
    }
}