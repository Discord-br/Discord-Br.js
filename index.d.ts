import { EventEmitter } from "events";
import Collection from "./src/Utils/Collection";

interface options {
    formatoImagem: "png" | "jpg" | "jpeg" | "webp" | "gif";
}

declare function DiscordBr(options?: options): DiscordBr.Client;
declare namespace DiscordBr {
    interface autor {
        nome: string,
        id: string,
        hashtag: string,
        avatar: string,
        flags: number,
        status: string,
        clientstatus: object,
        activities: object[];
    }
    interface activities {
        nome: string,
        id: string,
        tipo: string,
        url: string
        detalhes: object,
        estado: string
        appID: string
        horario: object,
        party: boolean,
        assets: object,
        emoji: object,
        syncID: string,
        criadoEm: string;
    }

    interface member {
        cargos: Role;
        nicknam: string;
        entrouEm: number;
        permissions: string;
    }

    interface Role{
        permissions: string;
        nome: string;
        mencionavel: boolean;
        id: string;
        cor: string;
    }
    
    interface Message {
        tipo: string;
        criado: number;
        embed?: Embed | EmbedOptions;
        conteudo: string;
        servidorID: string;
        canalID: string;
        id: string;
        autor: autor;
        responder: (content: string) => void;
        membro: member
    }

    interface Guild {
        entrou: number;
        quantidadeMembros: number;
        id: string;
        nome: string;
        cargos: collection
    }

    interface EventListeners<T> {
        (event: 'mensagem', func: (msg: Message) => void): T;
        (event: "online", func: () => void): T;
        (event: "servidorCriado", func: (guild: Guild) => void): T;
        (event: 'mensagemEditada', func: (msg: Message) => void): T;
    }

    interface ClientUser {
        nome: string;
        hashtag: string;
        id: string;
        verificado: boolean;
        email: string;
        bot: boolean;
        flags: number;
        avatar: string;
    }

    interface options {
        formatoImagem: "png" | "jpg" | "jpeg" | "webp" | "gif";
    }

    interface utils {
        msToDate(ms: number): void;
    }

    interface collection{
        atualizar(obj: object, extra?: number, replace?: number): void;
        adicionar(obj: object, extra?: number, replace?: number): void;
        filtrar(filter: void): void;
        encontrar(filter: void): void;
        mapear(filter: void): void;
        aleatorio(): void;
        remover(obj: object): void;
        come(obj: object): void;
        get(id: string): void;
    }

    interface EmbedOptions {
        titulo?: string;
        descrição?: string;
        url?: string;
        cor?: ColorResolvable;
        autor?: Partial<EmbedAuthor> & { icon_url?: string; proxy_icon_url?: string };
        miniimg?: Partial<EmbedThumbnail> & { proxy_url?: string };
        imagem?: Partial<EmbedImage> & { proxy_url?: string };
        rodape?: Partial<EmbedFooter> & { icon_url?: string; proxy_icon_url?: string };
    }

    interface Embed{
        constructor(data?: Embed | EmbedOptions);
        public autor: EmbedAuthor | null;
        public cor: string | number | null;
        public readonly createdAt: Date | null;
        public descrição: string | null;
        public rodape: EmbedFooter | null;
        public readonly hexColor: string | null;
        public imagem: EmbedImage | null;
        public readonly length: number;
        public miniimg: EmbedThumbnail | null;
        public titulo: string | null;
        public url: string | null;
        
        public setarAutor(nome: StringResolvable, iconURL?: string, url?: string): this;
        public setarCor(cor: ColorResolvable): this;
        public setarDescription(descrição: StringResolvable): this;
        public setarRodape(text: StringResolvable, iconURL?: string): this;
        public setarImagem(url: string): this;
        public setarMiniimg(url: string): this;
        public setarTitulo(titulo: StringResolvable): this;
        public setarURL(url: string): this;
    }

    interface EmbedThumbnail {
        url: string;
        proxyURL?: string;
        height?: number;
        width?: number;
    }

    interface EmbedAuthor {
        nome?: string;
        url?: string;
        iconURL?: string;
        proxyIconURL?: string;
    }

    interface EmbedFooter {
        text?: string;
        iconURL?: string;
        proxyIconURL?: string;
    }

    interface EmbedImage {
        url: string;
        proxyURL?: string;
        height?: number;
        width?: number;
    }

    type StringResolvable = string | string[] | any;
    type ColorResolvable = string | string[] | any;

    export class Client extends EventEmitter {
        eu: ClientUser;
        tempoon: number;
        token: string;
        options: options;
        servidores: collection;
        on: EventListeners<this>;
        usuarios: collection;
        cargos: collection;

        logar(token: string): void;

        enviarMensagem(id: string, content: string): void;

        utils: utils
    }
}

export = DiscordBr