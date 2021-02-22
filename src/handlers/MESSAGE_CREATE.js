const Message = require("../Utils/Message");

/**
 * Evento gerado a partir da Criação de uma mensagem
 * @function {MessageCreate}
 */
module.exports = function(client, payload) {
    const message = new Message(payload.d, client)
    client.emit("mensagem", message)
}