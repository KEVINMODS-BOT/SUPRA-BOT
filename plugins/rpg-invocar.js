let handler = async (m, { conn, participants }) => {
  let text = '🚩 *Invocando a todos los miembros del grupo* 🚩\n\n'
  
  // Recorrer la lista de participantes y agregar etiquetas, cada una en una nueva línea
  for (let member of participants) {
    text += `@${member.id.split('@')[0]}\n`
  }

  // Enviar el mensaje con la mención a todos
  await conn.sendMessage(m.chat, { text: text, mentions: participants.map(a => a.id) }, { quoted: m })
}

handler.help = ['invocar']
handler.tags = ['group']
handler.command = ['invocar', 'tagall', 'todos'] // Puedes usar varios nombres de comando

handler.group = true // Solo funciona en grupos
handler.admin = true // Solo administradores pueden usar el comando

export default handler
