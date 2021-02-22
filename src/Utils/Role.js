/**
 * Dados de um cargo
 * @class {Role}
 */

module.exports = class Role{
        /**
            * @constructor
            * @param {object} options - Dados de um cargo
        */
    constructor(client, data){
        this._client = client

        this.permissions = data.permissions
        this.nome = data.name
        this.mencionavel = data.mentionable
        this.id = data.id
        this.cor = data.color
        this.criadoEm = new Date(Math.floor(this.id / 4194304) + 1420070400000)
    }
}