const { throws } = require("assert");
const User = require("../Utils/User");

module.exports = class Message {
    constructor(data, client) {
        this._client = client;
        this.tipo = data.type || 0
        this.criadoEm = Date.parse(data.timestamp)
        this.conteudo = data.content || "";
        this.servidorID = data.guild_id || "";
        this.canalID = data.channel_id || "";
        this.id = data.id
        this.servidor = client.servidores.get(this.servidorID)
        if (data.author) {
            this.autor = this._client.usuarios.get(data.author.id)
        }

        if (data.member) {
            this.membro = this.servidor.membros.get(data.author.id)
        }
    }

    async responder(content = "") {
        const userAgent = `DiscordBot (https://github.com/Discord-br/Discord-Br.js, ${require("../../package.json").version})`;

        let res = ""

        return new Promise((resolve, reject) => {
            const headers = {
                "Authorization": "Bot " + this._client.token,
                "User-Agent": userAgent,
                "Content-Type": "application/json"
            };

            const fetch = require("node-fetch")

            let data;

            if(typeof content === "string"){

            data = JSON.stringify({ content: content, tts: false, message_reference: { message_id: this.id, guild_id: this.servidorID } })

            }else if(typeof content === "object"){
                data = JSON.stringify({embed: content, tts: false, message_reference: { message_id: this.id, guild_id: this.servidorID } })
  
            }
            fetch("https://discord.com" + "/api/v8" + "/channels/" + `${this.canalID}/messages`, {
                method: "POST",
                body: data,
                headers: headers
            }).then(res => res.json())
                .then(json => {
                    res = new Message(json, this._client)
                })
            return res;
        })
    }
}