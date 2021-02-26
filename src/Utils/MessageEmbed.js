const { throws } = require("assert");
const Util = require('./Util')

module.exports = class Embed {
    constructor(data, client) {
        this.setup(data)
    }

    setup(data) {
        this.tipo = data.type || 'rich'

        this.titulo = 'titulo' in data ? data.title : null;
        this.descrição = 'descrição' in data ? data.description : null;
        this.cor = 'cor' in data ? Util.defaultColorEmbed(data.color) : null;
        this.url = 'url' in data ? data.url : null;
        
        this.miniImg = data.miniImg
            ? {
                url: data.thumbnail.url,
                proxyUrl: data.thumbnail.proxyURL || data.thumbnail.proxy_url,
                height: data.thumbnail.height,
                width: data.thumbnail.width
              }
            : null

        this.imagem = data.image
            ? {
                url: data.image.url,
                proxyUrl: data.image.proxyURL || data.image.proxy_url,
                height: data.image.height,
                width: data.image.width
              }
            : null

        this.autor = data.author
            ? {
                nome: data.author.name,
                url: data.author.url,
                iconURL: data.author.iconURL || data.author.icon_url,
                proxyIconURL: data.author.proxyIconURL || data.author.proxy_icon_url,
              }
            : null

        this.rodape = data.footer
            ? {
                text: data.footer.text,
                iconURL: data.footer.iconURL || data.footer.icon_url,
                proxyIconURL: data.footer.proxyIconURL || data.footer.proxy_icon_url, 
              } 
            : null
    }

    setarCor(cor) {
        this.cor = Util.defaultColorEmbed(cor);
        return this;
    }

    setarTitulo(titulo) {
        titulo = Util.defaultString(titulo);
        this.titulo = titulo;
        return this;
    }

    setarRodape(text, iconURL) {
        text = Util.defaultString(text);
        this.rodape = { text, iconURL };
        return this;
    }
    
    setarDescrição(descrição) {
        descrição = Util.defaultString(descrição);
        this.descrição = descrição;
        return this;
    }

    setarImagem(url) {
        this.imagem = { url };
        return this;
    }

    setarMiniImg(url) {
        this.miniImg = { url };
        return this;
    }

    setarURL(url) {
        this.url = url;
        return this;
    }
  }
}
