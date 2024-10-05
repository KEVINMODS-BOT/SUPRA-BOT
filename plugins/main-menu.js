import { promises } from 'fs'
import { join } from 'path'

// Variable para los estados de los comandos
let maintenanceCommands = {};

// Comando para mostrar el menú
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let { exp, limit, level } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let uptime = clockString(process.uptime() * 1000)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

    // Función para obtener el estado de los comandos
    function getCommandStatus(command) {
      if (maintenanceCommands[command]) {
        return '🛠 En desarrollo';
      }
      return '🟢 Activo';
    }

    // Texto del menú con estados de los comandos
    let menuText = `

*Bienvenido* @${name}

*🔰INFORMACIÓN DEL BOT🔰*

➢ *[👨🏻‍💻] CREADOR:* ALDAIR
➢ *[💮] ESTADO:* ACTIVO 🟢
➢ *[👥] USUARIOS REGISTRADOS:* ${rtotalreg} 
➢ *[⏳] TIEMPO ACTIVO:* ${uptime}

╭──────༺♡༻──────╮
                *INFO-BOT*
╰──────༺♡༻──────╯

➢ .owner ${getCommandStatus('owner')}
➥ ve los contactos de los creadores 

➢ .grupos ${getCommandStatus('grupos')}
➥ ve los grupos y canales oficiales del bot 

➢ .estado ${getCommandStatus('estado')}
➥ ve el estado del bot 

➢ .totalfunciones ${getCommandStatus('totalfunciones')}
➥ ve cuántas funciones tiene el bot 

➢ .ping ${getCommandStatus('ping')}
➥ ve la velocidad del bot 

➢ .runtime ${getCommandStatus('runtime')}
➥ ve cuánto tiempo lleva activo el bot

➢ .joinfree link ${getCommandStatus('joinfree')}
➥ agrega al bot a tu grupo 

╭──────༺♡༻──────╮
               *ECONOMÍA*
╰──────༺♡༻──────╯

➢ .minar ${getCommandStatus('minar')}
➥ mina diamantes

➢ .cazar ${getCommandStatus('cazar')}
➥ caza animales y gana créditos 

➢ .slot cantidad ${getCommandStatus('slot')}
➥ apuesta créditos y gana 

➢ .ruleta 10 negro / rojo ${getCommandStatus('ruleta')}
➥ apuesta y gana créditos 

➢ .crimen ${getCommandStatus('crimen')}
➥ roba créditos a otros usuarios 

➢ .robar @user ${getCommandStatus('robar')}
➥ roba los créditos de otros usuarios / no se puede robar si está en el banco

➢ .depositar cantidad ${getCommandStatus('depositar')}
➥ deposita el dinero al Banco y guárdalo

➢ .retirar cantidad ${getCommandStatus('retirar')}
➥ retira el dinero del Banco 

➢ .banco ${getCommandStatus('banco')}
➥ guarda tus créditos de cualquier robo 

➢ .topcreditos ${getCommandStatus('topcreditos')}
➥ ve el top de mayores créditos 

➢ .transferir @user cantidad ${getCommandStatus('transferir')}
➥ transfiere créditos a otros usuarios

╭──────༺♡༻──────╮
         *TIENDA Y VENTAS*
╰──────༺♡༻──────╯

➢ .comprarwaifu ${getCommandStatus('comprarwaifu')}
➥ compra una waifu 

➢ .miswaifus ${getCommandStatus('miswaifus')}
➥ ve tus waifus que compraste

➢ .venderwaifu ${getCommandStatus('venderwaifu')}
➥ vende la waifu que tienes

➢ .pokemon pikachu ${getCommandStatus('pokemon')}
➥ para ver el pokemon y sus estadísticas

➢ .comprarpokemon pikachu ${getCommandStatus('comprarpokemon')}
➥ compra el pokemon

➢ .mipokemon ${getCommandStatus('mipokemon')}
➥ ve tu pokemon que tienes 

➢ .venderpokemon número ${getCommandStatus('venderpokemon')}
➥ vende tu pokemon 

➢ .regalarpokemon @user Pikachu ${getCommandStatus('regalarpokemon')}
➥ regala un pokemon a tu amigo 

╭──────༺♡༻──────╮
              *BUSQUEDAS*
╰──────༺♡༻──────╯

➢ .pinterest ${getCommandStatus('pinterest')}
➥ busca imágenes de Pinterest

➢ .fenixgpt cuanto es 1+1 ${getCommandStatus('fenixgpt')}
➥ busca información rápido con fenixgpt 🐦‍🔥

➢ .google búsqueda ${getCommandStatus('google')}
➥ busca cosas en Google 

➢ .imagen búsqueda ${getCommandStatus('imagen')}
➥ busca imagen de lo que busques

➢ .tiktok link ${getCommandStatus('tiktok')}
➥ descarga un vídeo de TikTok sin marca de agua 

➢ .tiktoksearch nombre ${getCommandStatus('tiktoksearch')}
➥ ve videos de TikTok en carrusel

╭──────༺♡༻──────╮
               *SUB BOTS*
╰──────༺♡༻──────╯

➢ .bots ${getCommandStatus('bots')}
➥ ve cuántos subbots hay 

➢ .code ${getCommandStatus('code')}
➥ pide Código para vincular y ser un subbot 

➢ .qr ${getCommandStatus('qr')}
➥ pide Código QR para escanear y ser un subbot

╭──────༺♡༻──────╮
                *REGISTRO*
╰──────༺♡༻──────╯

➢ .reg nombre.edad ${getCommandStatus('reg')}
➥ regístrate en el bot 

➢ .unreg número de serie ${getCommandStatus('unreg')}
➥ elimina tu registro del bot 

➢ .nserie ${getCommandStatus('nserie')}
➥ ve tu número de serie 

➢ .perfil ${getCommandStatus('perfil')}
➥ ve tu perfil en el bot

╭──────༺♡༻──────╮
                *STICKERS*
╰──────༺♡༻──────╯

➢ .s / .stikert ${getCommandStatus('stikert')}
➥ convierte una foto en sticker

╭──────༺♡༻──────╮
               *IMÁGENES*
╰──────༺♡༻──────╯

➢ .megumin ${getCommandStatus('megumin')}
➢ .neko ${getCommandStatus('neko')}
➢ .shinobu ${getCommandStatus('shinobu')}

╭──────༺♡༻──────╮
               *DIVERSION*
╰──────༺♡༻──────╯

➢ .afk razón ${getCommandStatus('afk')}
➥ quédate AFK sin que te molesten 

➢ .dance @user ${getCommandStatus('dance')}
➥ baila con un usuario

➢ .abrazo @user ${getCommandStatus('abrazo')}
➥ abraza a un usuario 

➢ .golpear @user ${getCommandStatus('golpear')}
➥ golpea a un usuario

➢ .besar @user ${getCommandStatus('besar')}
➥ besa a un usuario 

➢ .gay @user ${getCommandStatus('gay')}
➥ ve el promedio de gay de un usuario 

➢ .ship @user @user ${getCommandStatus('ship')}
➥ shipea a dos usuarios 

➢ .bot hola ${getCommandStatus('bot')}
➥ interactúa con el bot

╭──────༺♡༻──────╮
                  *GRUPOS*
╰──────༺♡༻──────╯

➢ .i༻─ ${getCommandStatus('infogrupo')}
➥ ve la información del grupo

➢ .grupo cerrar ${getCommandStatus('grupo')}
➥ cierra el grupo

➢ .grupo abrir ${getCommandStatus('grupo')}
➥ abre el grupo 

➢ .kick @user ${getCommandStatus('kick')}
➥ elimina a un usuario 

➢ .link ${getCommandStatus('link')}
➥ ve el link del grupo 

➢ .encuesta pregunta|opciones ${getCommandStatus('encuesta')}
➥ haz encuestas en el grupo 

➢ .promote @user ${getCommandStatus('promote')}
➥ asciende a admin a un usuario 

➢ .invocar mensaje ${getCommandStatus('invocar')}
➥ invoca a todo el grupo

╭──────༺♡༻──────╮
                 *ON / OFF*
╰──────༺♡༻──────╯

➢ .on / off welcome ${getCommandStatus('welcome')}
➥ activa y desactiva la bienvenida

➢ .on / off antilink ${getCommandStatus('antilink')}
➥ activa y desactiva el antilink
    `;

    // Enviar el menú
    await conn.sendMessage(m.chat, { text: menuText }, { quoted: m });
  } catch (e) {
    console.log(e);
    await conn.reply(m.chat, 'Hubo un error al generar el menú.', m);
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(menu|help|commands)$/i;

module.exports = handler;
