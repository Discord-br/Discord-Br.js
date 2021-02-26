/**
 * Informação dos canais
 * @class {Channel}
 */
module.exports = class Channel{

        /**
            * @constructor
            * @param {object} options - informações do canal
        */
    constructor(client, data){
        this.tipo = data.type
        this.topico = data.topic || ""
        this.nsfw = data.nsfw
        this.nome = data.name
        this.id = data.id
        this.ultimamensagem = data.last_message_id
        this.position = data.position
        this.category = this.parent_id
        this.criadoEm = new Date(Math.floor(this.id / 4194304) + 1420070400000)
    }
}