const Collection = require("../Utils/Collection");
const Channel = require("./Channel");
const Emoji = require("./Emoji");
const MemberGuild = require("./MemberGuild");
const Role = require("./Role");

/**
 * Informação dos Servidores
 * @class {Guild}
 */

module.exports = class Guild {
         /**
            * @constructor
            * @param {object} options - informações do Servidor
        */
       
    _client;
    entrou;
    quantidadeMembros;
    id;

    constructor(data, client){
        //console.log(data)

        this.entrouEm = Date.parse(data.joined_at)
        this.quantidadeMembros = Number(data.member_count);
        this.id = String(data.id)
        this.criadoEm = new Date(Math.floor(this.id / 4194304) + 1420070400000)
        this.nome = String(data.name)
        this.cargos = new Collection(Role)
        data.roles.map(e => {
            this.cargos.adicionar(new Role(client, e))
        })
        this.membros = new Collection(MemberGuild)
        data.members.map(e => {
            this.membros.adicionar(new MemberGuild(client, e))
        })
        this.canais = new Collection(Channel)
        data.channels.map(e => {
            this.canais.adicionar(new Channel(client, e))
        })
        this.emojis = new Collection(Emoji)
        data.emojis.map(e => {
            this.emojis.adicionar(new Emoji(client, e))
        })
    }

    get entrou(){
        return this.entrou
    }

    get quantidadeMembros(){
        return this.quantidadeMembros
    }

    get id(){
        return this.id
    }
}