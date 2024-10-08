let handler = async (m, { conn }) => {
  try {
    let name = await conn.getName(m.sender)
    let menuText = `

*Bienvenido* @${name} 

*🔰INFORMACIÓN DEL BOT🔰*

➢ *[👨🏻‍💻] CREADOR:* ALDAIR
➢ *[💮] ESTADO:* ACTIVO 🟢
➢ *[🔐] MODO:* ${global.opts['self'] ? 'Privado' : 'Público'}

`.trim()

    await conn.sendMessage(m.chat, { 
      text: menuText, 
      contextInfo: { 
        externalAdReply: {
          title: "Haz clic para ver el canal", // El título que aparece
          body: "Canal oficial de WhatsApp",   // Descripción del canal
          mediaType: 1,                       // Tipo de medio, 1 es para un link
          mediaUrl: "https://whatsapp.com/channel/0029VapwUi0Dp2QC3xO9PX42", // URL del canal
          sourceUrl: "https://whatsapp.com/channel/0029VapwUi0Dp2QC3xO9PX42", // También enlaza al canal
          thumbnail: await fetchBuffer("https://qu.ax/LXzyv.jpg") // URL de la imagen
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

// Función para descargar la imagen y convertirla en buffer
async function fetchBuffer(url) {
  let res = await fetch(url)
  return await res.buffer()
}
