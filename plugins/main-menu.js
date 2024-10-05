import { promises } from 'fs'
import { join } from 'path'

// Variable para los estados de los comandos
let maintenanceCommands = {};

// Comando para mostrar el menú
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let d = new Date(new Date() + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
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

*Puede seguir el canal del bot:* https://whatsapp.com/channel/0029VapwUi0Dp2QC3xO9PX42

*🔰INFORMACIÓN DEL BOT🔰*

*𝘈𝘊𝘛𝘜𝘈𝘓𝘐𝘡𝘈𝘊𝘐𝘖𝘕  < 1.2.1 >*

➢ *[👨🏻‍💻] CREADOR:* ALDAIR
➢ *[💮] ESTADO:* ACTIVO 🟢
➢ *[👥] USUARIOS REGISTRADOS:* ${rtotalreg} 
➢ *[⏳] TIEMPO ACTIVO:* ${uptime}
➢ *[🔐] MODO:* ${global.opts['self'] ? 'Privado' : 'Público'}

╭──────༺♡༻──────╮
                *INFO-BOT*
╰──────༺♡༻──────╯

➢ .owner ${getCommandStatus('owner')}
➢ .grupos ${getCommandStatus('grupos')}
➢ .estado ${getCommandStatus('estado')}
➢ .totalfunciones ${getCommandStatus('totalfunciones')}
➢ .ping ${getCommandStatus('ping')}
➢ .runtime ${getCommandStatus('runtime')}
➢ .joinfree link ${getCommandStatus('joinfree')}

╭──────༺♡༻──────╮
               *ECONOMÍA*
╰──────༺♡༻──────╯

➢ .minar ${getCommandStatus('minar')}
➢ .cazar ${getCommandStatus('cazar')}
➢ .slot cantidad ${getCommandStatus('slot')}
➢ .ruleta 10 negro / rojo ${getCommandStatus('ruleta')}
➢ .crimen ${getCommandStatus('crimen')}
➢ .robar @user ${getCommandStatus('robar')}
➢ .depositar cantidad ${getCommandStatus('depositar')}
➢ .retirar cantidad ${getCommandStatus('retirar')}
➢ .banco ${getCommandStatus('banco')}
➢ .topcreditos ${getCommandStatus('topcreditos')}
➢ .transferir @user cantidad ${getCommandStatus('transferir')}

╭──────༺♡༻──────╮
         *TIENDA Y VENTAS*
╰──────༺♡༻──────╯

➢ .comprarwaifu ${getCommandStatus('comprarwaifu')}
➢ .miswaifus ${getCommandStatus('miswaifus')}
➢ .venderwaifu ${getCommandStatus('venderwaifu')}
➢ .pokemon pikachu ${getCommandStatus('pokemon')}
➢ .comprarpokemon pikachu ${getCommandStatus('comprarpokemon')}
➢ .mipokemon ${getCommandStatus('mipokemon')}
➢ .venderpokemon número ${getCommandStatus('venderpokemon')}
➢ .regalarpokemon @user Pikachu ${getCommandStatus('regalarpokemon')}


`.trim()

    let imageUrl = 'https://qu.ax/KFrad.jpg' // Reemplaza esto con el enlace directo a tu imagen
    await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: menuText }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

// Comando para activar o desactivar el mantenimiento de un comando
let maintenanceHandler = async (m, { text, isOwner }) => {
  if (!isOwner) return m.reply('🚫 Este comando solo puede ser usado por el propietario del bot.');

  let [cmd, status] = text.split(' ');
  if (!cmd || !status || (status !== 'on' && status !== 'off')) {
    return m.reply(`Formato incorrecto.\n\nUso correcto: *${usedPrefix}mantenimiento .comando on|off*\nEjemplo: *${usedPrefix}mantenimiento .ping on*`);
  }

  cmd = cmd.replace('.', '').trim();
  maintenanceCommands[cmd] = status === 'on' ? true : false;
  return m.reply(`🔧 El comando *${cmd}* ahora está en estado: ${status === 'on' ? '🛠 En desarrollo' : '🟢 Activo'}.`);
};

// Comandos y ayuda
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 

// Comando .mantenimiento
maintenanceHandler.command = ['mantenimiento'];
maintenanceHandler.owner = true; // Solo el owner puede usarlo

export default handler;
export { maintenanceHandler };

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
