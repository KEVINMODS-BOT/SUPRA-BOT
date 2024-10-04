export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome);
  let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios);
  let img = await (await fetch(${pp})).buffer();
  let img2 = await (await fetch(${pp2})).buffer();

  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.messageStubParameters[0]] || {}; // Asumiendo que tienes una base de datos de usuarios
  
  let registered = user.registered ? "Sí" : "No"; // Comprueba si está registrado
  let limit = user.limit || 0; // Asigna la cantidad de créditos como "limit"

  if (chat.welcome && m.messageStubType == 27) { // Cuando un usuario entra
    let wel = *BIENVENIDO @${m.messageStubParameters[0].split@[0]} AL GRUPO ${groupMetadata.subject}*\n\n*TU INFORMACIÓN*\n➢ Registrado: ${registered}\n➢ Créditos: ${limit};
    await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
  }

  if (chat.welcome && m.messageStubType == 28) { // Cuando un usuario se va
    let bye = *@${m.messageStubParameters[0].split@[0]} SALIÓ DEL GRUPO 👁‍🗨*;
    await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
  }

  if (chat.welcome && m.messageStubType == 32) { // Cuando un usuario es expulsado
    let kick = *@${m.messageStubParameters[0].split@[0]} FUE EXPULSADO DEL GRUPO 👁‍🗨*;
    await conn.sendMini(m.chat, packname, dev, kick, img2, img2, channel, fkontak);
  }
}
