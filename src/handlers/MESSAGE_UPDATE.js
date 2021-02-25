const Message = require("../Utils/Message");

/**
 * Evento gerado a partir da atualização/edição de uma mensagem
 * @function {MessageUpdate}
 */
module.exports = async function(client, payload) {  
    return client.emit("mensagem", await new Message(payload.d, client));
 }