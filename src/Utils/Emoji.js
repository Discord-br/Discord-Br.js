/**
 * Informação dos canais
 * @class {Emoji}
 */

module.exports = class Emoji{
         /**
            * @constructor
            * @param {object} options - informações do emoji
        */
    constructor(client, data){
        this.nome = data.name
        this.id = data.id
        this.animado = data.animated
        this.disponivel = data.available
        this.criadoEm = new Date(Math.floor(this.id / 4194304) + 1420070400000)
    }
}