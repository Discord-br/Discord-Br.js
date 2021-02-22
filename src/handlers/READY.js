const Guild = require("../Utils/Guild")

/**
 * Evento gerado a partir do momento que a aplicação está online
 * @function {Ready}
 */
module.exports =  function(client, payload) {
  const d = payload.d

  client.eu = {
    nome: d.user.username,
    hashtag: d.user.discriminator,
    id:  d.user.id,
    verificado: d.user.verified,
    email: d.user.email,
    bot: d.user.bot,
    flags: d.user.flags,
    avatar: d.user.avatar
  }
  
  for (const guild of d.guilds) {
    client._preguilds.push(guild.id)
  }

  client.ready = true
  client.emit("online")
}