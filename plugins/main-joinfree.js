
let handler = async (m, { conn, text }) => {
  if (!text) throw '🚩 Debes proporcionar el enlace de un grupo.'

  // Verificar si el link proporcionado es un enlace de grupo de WhatsApp válido
  let [_, code] = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/) || []
  if (!code) throw '🚩 El enlace proporcionado no es válido.'

  // Intentar unirse al grupo
  try {
    await conn.groupAcceptInvite(code)

    // Enviar mensaje de éxito al grupo
    await conn.sendMessage(m.chat, {
      text: `*BILL - BOT SE UNIÓ AL GRUPO CORRECTAMENTE*\n\n*PUEDE SEGUIR EL CANAL DEL BOT* https://whatsapp.com/channel/0029VapwUi0Dp2QC3xO9PX42`,
    })
  } catch (e) {
    throw '🚩 No se pudo unir al grupo, por favor verifica que el enlace sea correcto y que el bot tenga permisos.'
  }
}

handler.help = ['joinfree <enlace de grupo>']
handler.tags = ['group']
handler.command = ['joinfree'] // Comando a utilizar

handler.register = true // Cualquier usuario puede usarlo

export default handler
