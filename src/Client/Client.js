const { throws } = require('assert');
const { EventEmitter } = require('events');
const Collection = require('../Utils/Collection');
const Emoji = require('../Utils/Emoji');
const Guild = require('../Utils/Guild');
const Message = require('../Utils/Message');
const Role = require('../Utils/Role');
const User = require('../Utils/User');
const Websocket = require('../WebSocket/WebSocketManager');
const atividade = require('../Utils/Activity')
const presenca = require('../Utils/Prescence')
/**
 * A principal parte das interações com a API do discord e o ponto de partida para qualquer bot
 * @extends {EventEmitter}
 */

module.exports = class Client extends EventEmitter {
    /**
 * @constructor
 * @param {object} options - configurações do client
 */
    constructor(options = {formatoImagem: "png"||"gif"||"jpeg"||"jpg"||"webp"}) {
        super()
        this.token;

        /*
        nome: string;
        hashtag: string;
        id: string;
        verificado: boolean;
        email: string;
        bot: boolean;
        flags: number;
        avatar: string;
        */

        this._user = {
            nome: "",
            hashtag: "",
            id: "",
            verificado: false,
            email: "",
            bot: false,
            flags: 0,
            avatar: ""
        }
        this.presencas = {
            atividade,
            presenca
        }
        /**
            * Coleção de Emojis
            * @type {Collection}
        */
        this.emojis = new Collection(Emoji)

        /**
            * Ping da API
            * @type {Number}
        */
        this._ping = 0;

         /**
            * Coleção de Usuarios
            * @type {Collection}
        */
        this.usuarios = new Collection(User)

        this.websocket = Websocket
         /**
            * Opções 
            * @type {Object}
        */
        this.options = Object.assign({
            formatoImagem: "png"||"gif"||"jpeg"||"jpg"||"webp"
        }, options)

        if (this.options && this.options.formatoImagem && !["png", "gif", "jpeg", "jpg", "webp"].includes(this.options.formatoImagem)) {
            throw new Error("Formato de Imagem errado!")
        }

         /**
            * Está ativo? 
            * @type {Boolean}
        */
        this.online = false;

        /**
            * Tempo ativo
            * @type {Number}
        */
        this.startTime = 0;

         /**
            * Coleção de servidores
            * @type {Collection}
        */
        this.servidores = new Collection(Guild);

        /**
            * Pré-Guilds
            * @type {Array}
        */
        this._preguilds = []

         /**
            * Coleção de servidores
            * @type {Collection}
        */
        this.cargos = new Collection(Role)

         /**
            * Utils
            * @type {Object}
        */
       
        this.utils = {
            msToDate: async function(time) {
                time = Math.round(time / 1000);
                const s = time % 60,
                    m = Math.floor((time / 60) % 60),
                    h = Math.floor((time / 60 / 60) % 24),
                    d = Math.floor(time / 60 / 60 / 24);
            
                return {
                     dias: d,
                     horas: h,
                     minutos: m,
                     segundos: s
                }
            }
        }
        
    }

        /**
            * Pronto?
            * @type {Boolean}
        */
    set ready(aa){
        this.online = aa;
    }
            /**
            * Ping da API
            * @type {Number}
        */
    get ping(){
        return this._ping
    }

        /**
            * Ping da API
            * @type {Number}
        */
    set ping(ping){
        this._ping = ping
    }

        /**
            * Envia uma mensagem
            * @type {Object}
        */
    async enviarMensagem(id = "", content){
        
        if(typeof content == "string"){
            await this.FetchMessage(id, {
                "content": content,
                "tts": false
              })
        }
    }
        /**
            * Procura uma mensagem
            * @type {Object}
        */
    async FetchMessage(id = "", body = {}){
        const userAgent = `DiscordBot (https://github.com/Discord-br/Discord-Br.js, ${require("../../package.json").version})`;
        let res = ""
        
        return new Promise((resolve, reject) =>{
        const headers = {
                "Authorization": "Bot "+this.token,
                "User-Agent": userAgent,
                "Content-Type": "application/json"
        };
        
        const fetch = require("node-fetch")

        let data = JSON.stringify(body)

        fetch("https://discord.com"+"/api/v8"+"/channels/" + `${id}/messages`, {
            method: "POST",
            body: data,
            headers: headers
        }).then(res => res.json())
        .then(json => {
            res = new Message(json, this)
        })
        return res;
        })
    }

        /**
            * Online?
            * @type {Boolean}
        */
    get ready(){
        return this.online
    }
        /**
            * Execulta o Login
            * @type {Function}
        */
    async logar(token) {
        if (!token || typeof token !== "string") throw new Error("Token Inválido!");
        this.token = token = token.replace(/^(Bot|Bearer)\s*/i, '');
        const WebSocket = require("../WebSocket/WebSocketManager");
        this.startTime = Date.now();
        const ws = new WebSocket(this)
        ws.connect(this.token)
    }

        /**
            * Tempo Online
            * @type {Number}
        */
    get tempoOn() {
        return Date.now() - this.startTime
    }
        /**
            * Token do Bot
            * @type {String}
        */
    get chave() {
        return this.token
    }
        /**
            * Informações do user
            * @type {Object}
        */
    set eu(user) {
        this._user = user
    }
        /**
            * Informações do user
            * @type {Object}
        */
    get eu() {
        return this._user
    }

}