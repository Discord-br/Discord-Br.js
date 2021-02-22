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

    export class Client extends EventEmitter {
        eu: ClientUser;
        tempoon: number;
        token: string;
        options: options;
        servidores: collection;
        on: EventListeners<this>;
        usuarios: collection;
        cargos: collection;

        login(token: string): void;

        enviarMensagem(id: string, content: string): void;

        utils: utils
    }
}

export = DiscordBr