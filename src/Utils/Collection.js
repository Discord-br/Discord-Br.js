/**
 * Informação dos canais
 * @extends {Map}
 */
module.exports = class Collection extends Map {
        /**
            * @constructor
            * @param {object} options - informações do canal
        */
    constructor(base, limit){
        super()

        this.base = base;
        this.limit = limit || Infinity;
    }

    atualizar(obj, extra, replace){
        if(!obj.id && obj.id !== 0) {
            throw new Error("Cade o id do objeto?");
        }
        const item = this.get(obj.id);
        if(!item) {
            return this.adicionar(obj, extra, replace);
        }
        item.update(obj, extra);
        return item;
    }

    adicionar(obj, extra, replace) {
        if(this.limit === 0) {
            return (obj instanceof this.base || obj.constructor.name === this.base.name) ? obj : new this.base(obj, extra);
        }
        if(obj.id == null) {
            throw new Error("Cade o ID do objeto?");
        }
        const existing = this.get(obj.id);
        if(existing && !replace) {
            return existing;
        }
        if(!(obj instanceof this.base || obj.constructor.name === this.base.name)) {
            obj = new this.base(obj, extra);
        }

        this.set(obj.id, obj);

        if(this.limit && this.size > this.limit) {
            const iter = this.keys();
            while(this.size > this.limit) {
                this.delete(iter.next().value);
            }
        }
        return obj;
    }

    filtrar(filter){
        const arr = [];
        for(const item of this.values()){
            if(filter(item)){
                arr.push(item)
            }
        }
        return arr;
    }

    primeiro(){
        return this.values().next().value
    }

    encontrar(filter) {
        for(const item of this.values()) {
            if(filter(item)) {
                return item;
            }
        }
        return undefined;
    }

    mapear(filter) {
        const arr = [];
        for(const item of this.values()) {
            arr.push(filter(item));
        }
        return arr;
    }

    aleatorio(){
        const index = Math.floor(Math.random() * this.size)
        const iter = this.values();
        for(let i = 0; i < index; i++){
            iter.next()
        }
        return iter.next().value
    }

    remover(obj){
        const item = this.get(obj.id)
        if(!item){
            return null;
        }

        this.delete(obj.id)
        return item;
    }

    come(filter) { // Sim, come
        for(const item of this.values()) {
            if(filter(item)) {
                return true;
            }
        }
        return false;
    }
}