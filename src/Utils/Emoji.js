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
    get identificador() {
        if (this.id) return `${this.animado ? 'a:' : ''}${this.nome}:${this.id}`;
        return encodeURIComponent(this.name);
      }
      
    get url() {
        if (!this.id) return null;
        return this.client.rest.cdn.Emoji(this.id, this.animated ? 'gif' : 'png');
      }
}