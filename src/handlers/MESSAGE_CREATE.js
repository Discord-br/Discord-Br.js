const Message = require("../Utils/Message");

/**
 * Evento gerado a partir da Criação de uma mensagem
 * @function {MessageCreate}
 */
module.exports = async function(client, payload) {  
   return client.emit("mensagem", new Message(payload.d, client));
}