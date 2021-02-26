const dbr = require("discord-br.js")

const client = new dbr.Client()

client.logar("TOKEN")

client.on("mensagem", async(message) => {
    
   if(message.conteudo === "!ping"){
       message.responder("Pong!")
   }
    
})
