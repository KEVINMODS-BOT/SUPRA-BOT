let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let name = await conn.getName(m.sender)
    let menuText = `

*Bienvenido* @${name} 

*🔰INFORMACIÓN DEL BOT🔰*

*𝘈𝘊𝘛𝘜𝘈𝘓𝘐𝘡𝘈𝘊𝘐𝘖𝘕  < 1.2.1 >*

➢ *[👨🏻‍💻] CREADOR:* ALDAIR
➢ *[💮] ESTADO:* ACTIVO 🟢
➢ *[🔐] MODO:* ${global.opts['self'] ? 'Privado' : 'Público'}

`.trim()

    // Simular el reenvío desde un canal
    await conn.sendMessage(m.chat, { 
      text: menuText, 
      contextInfo: { 
        externalAdReply: {
          title: "Canal de WhatsApp",
          body: "Haz clic para ver el canal",
          mediaType: 1,
          mediaUrl: "https://whatsapp.com/channel/0029VapwUi0Dp2QC3xO9PX42", // URL del canal
          thumbnail: null
        }
      }
    }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler
