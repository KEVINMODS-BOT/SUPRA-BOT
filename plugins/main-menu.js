let handler = async (m, { conn }) => {
  try {
    let name = await conn.getName(m.sender)
    let menuText = `

*Bienvenido* @${name} 

*🔰INFORMACIÓN DEL BOT🔰*

➢ *[👨🏻‍💻] CREADOR:* ALDAIR
➢ *[💮] ESTADO:* ACTIVO 🟢
➢ *[🔐] MODO:* ${global.opts['self'] ? 'Privado' : 'Público'}


 ╭──────༺♡༻──────╮
                *INFO-BOT*
╰──────༺♡༻──────╯


➢ .owner 
➥ ve los contactos de los creadores 

➢ .grupos 
➥ ve los grupos y canales oficiales del bot 

➢ .estado 
➥ ve el estado del bot 

➢ .totalfunciones 
➥ ve cuantas funciones tiene el bot 

➢ .ping 
➥ ve la velocidad del bot 

➢ .runtime 
➥ ve cuanto tiempo lleva activo el bot

➢ .joinfree link
➥ agrega al bot a tu grupo 


╭──────༺♡༻──────╮
               *ECONOMÍA*
╰──────༺♡༻──────╯

➢ .minar
➥ mina diamantes

➢ .cazar 
➥ caza animales y gana créditos 

➢ .slot cantidad 
➥ apuesta créditos y gana 

➢ .ruleta 10 negro / rojo 
➥ apuesta y gana créditos 

➢ .crimen 
➥ roba créditos a otros usuarios 

➢ .robar @user
➥ roba los créditos de otros usuarios / no se puede robar si esta en el banco

➢ .depositar cantidad 
➥ deposita el dinero al Banco y guardalos 

➢ .retirar cantidad 
➥ retira el dinero del Banco 

➢ .banco 
➥ guarda tus créditos de cualquier robo 

➢ .topcreditos
➥ ve el top de mayores créditos 

➢ .transferir @user cantidad 
➥ transfiere créditos a otros usuarios


╭──────༺♡༻──────╮
         *TIENDA Y VENTAS*
╰──────༺♡༻──────╯
 
➢ .comprarwaifu 
➥ comprar una waifu 

➢ .miswaifus 
➥ ve tus waifus que compraste

➢ .venderwaifu
➥ vende la waifu que tienes

➢ .pokemon pikachu
➥ para ver el pokemon y sus estadísticas

➢ .comprarpokemon pikachu
➥ compra el pokemon

➢ .mipokemon
➥ ve tu pokemon que tienes 

➢ .venderpokemon número 
➥ vende tu pokemon 

➢ .regalarpokemon @user Pikachu
➥ regala un pokemon a tu amigo 



╭──────༺♡༻──────╮
              *BUSQUEDAS*
╰──────༺♡༻──────╯


➢ .pinterest 
➥ busca imágenes de pinterest

➢ .fenixgpt cuanto es 1+1
➥ busca información rápido con fenixgpt 🐦‍🔥

➢ .google búsqueda
➥ busca cosas de google 

➢ .imagen búsqueda
➥ busca imagen de lo que busques

➢ .tiktok link 
➥ descarga un vídeo de tiktok sin marca de agua 

➢ .tiktoksearch nombre 
➥ ve videos de tiktok en carrusel


╭──────༺♡༻──────╮
               *SUB BOTS*
╰──────༺♡༻──────╯


➢ .bots 
➥ ve cuantos subots ahí 

➢ .code 
➥ pide Código para vincular y ser un subot 

➢ .qr
➥ pide Código qr para escanear y ser un subot


╭──────༺♡༻──────╮
                *REGISTRO*
╰──────༺♡༻──────╯


➢ .reg nombre.edad
➥ regístrate en el bot 

➢ .unreg número de serie 
➥ elimina tu registro del bot 

➢ .nserie 
➥ ve tu número de serie 

➢ .perfil 
➥ ve tu perfil en el bot


╭──────༺♡༻──────╮
                *STICKERS*
╰──────༺♡༻──────╯


➢ .s / .stikert 
➥ convierte una foto en stikert


╭──────༺♡༻──────╮
               *IMÁGENES*
╰──────༺♡༻──────╯


➢ .megumin 

➢ .neko 

➢ .shinobu


╭──────༺♡༻──────╮
               *DIVERSION*
╰──────༺♡༻──────╯


➢ .afk razón 
➥ quédate afk sin que te molesten 

➢ .dance @user 
➥ baila con un usuario

➢ .abrazo @user 
➥ abraza a un usuario 

➢ .golpear @user
➥ golpear a un usuario

➢ .besar @user
➥ besa a un usuario 

➢ .gay @user 
➥ ve el promedio de gay de un usuario 

➢ .ship @user @user 
➥ shipea a dos usuarios 

➢ .bot hola 
➥ interactúa con el bot


╭──────༺♡༻──────╮
                  *GRUPOS*
╰──────༺♡༻──────╯

➢ .infogrupo
➥ ve la información del grupo

➢ .grupo cerrar 
➥ cierra el grupo

➢ .grupo abrir
➥ abre el grupo 

➢ .kick @user 
➥ elimina a un usuario 

➢ .link 
➥ ve el link del Grupo 

➢ .encuesta pregunta|opciones 
➥ haz encuestas en el grupo 

➢ .promote @user 
➥ asciende a admin a un usuario 

➢ .invocar mensaje 
➥ invoca a todo el grupo


╭──────༺♡༻──────╮
                 *ON / OFF*
╰──────༺♡༻──────╯


➢ .on / off welcome 
➥ activa y desactiva la bienvenida

➢ .on / off antilink 
➥ activa y desactiva el antilink
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
