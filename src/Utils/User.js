/**
 * Dados de um usuario
 * @class {User}
 */

module.exports = class User{
    /**
            * @constructor
            * @param {object} options - Dados de um usuario
        */
    constructor(client, dados) {
        this.nome = dados.username
        this.id = dados.id
        this.hashtag = dados.discriminator
        this.bot = dados.bot || false
        this.avatar = dados.avatar
        this._client = client
        this._status = "";
        this._clientstatus = {};
        this._activities = [];
        this.criadoEm = new Date(Math.floor(this.id / 4194304) + 1420070400000)
    }

         /**
            * Status do usuario IDLE/DND/ONLINE/OFFLINE
            * @type {String}
        */
    set status(status){
        this._status = status
    }
         /**
            * Status do usuario
            * @type {Object}
        */
    set clientstatus(status) {
        this._clientstatus = status
    }
         /**
            * Status do usuario MUSICA/JOGO/PERSONALIZADO
            * @type {Array}
        */
    set activites(activites) {
        this._activities = activites
    }
          /**
            * Status do usuario MUSICA/JOGO/PERSONALIZADO
            * @type {Array}
        */
    get activites(){
        return this._activities
    }
         /**
            * Status do usuario IDLE/DND/ONLINE/OFFLINE
            * @type {String}
        */
    get status(){
        return this._status
    }
         /**
            * Status do usuario
            * @type {Object}
        */
    get clientstatus(){
        return this._clientstatus
    }
}