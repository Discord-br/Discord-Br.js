const Message = require("../Utils/Message");

/**
 * Evento gerado a partir da atualização/edição de uma mensagem
 * @function {MessageUpdate}
 */
module.exports = function(client, payload) {
    const message = new Message(payload.d, client)
    client.emit("mensagemEditada", message)
}