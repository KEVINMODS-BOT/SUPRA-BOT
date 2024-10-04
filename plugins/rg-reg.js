import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🚩 Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg* <Número de serie>`)
  if (!Reg.test(text)) return m.reply(`🚩 Formato incorrecto.\n\nUso del comando: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.16*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🚩 El nombre no puede estar vacío.')
  if (!age) return m.reply('🚩 La edad no puede estar vacía.')
  if (name.length >= 100) return m.reply('🚩 El nombre es demasiado largo.')
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 Wow, el abuelo quiere jugar al bot.')
  if (age < 5) return m.reply('🚼 Hay un abuelo bebé jsjsj.')
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let countryCode = m.sender.slice(0, 2) // Se obtiene el código de país del número
  let { country, flag } = getCountryByCode(countryCode) // Función que devuelve el país y la bandera según el código de país
  let img = await (await fetch(`https://qu.ax/KFrad.jpg`)).buffer()
  let txt = `*R E G I S T R O*\n\n`
      txt += `*E X I T O S O ✅*\n\n`
      txt += `*Usted está registrado en mi base de datos*\n\n`
      txt += `𓊈  *INFORMACIÓN* 𓊉\n\n`
      txt += `➥ *Nombre*: ${name}\n`
      txt += `➥ *Edad*: ${age} años\n`
      txt += `➥ *País*: ${country} ${flag}\n`
      txt += `➥ *Número de serie*: ${sn}`
  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
  await m.react('✅')
}

function getCountryByCode(code) {
  const countries = {
    '1': { country: 'Estados Unidos/Canadá', flag: '🇺🇸/🇨🇦' },
    '52': { country: 'México', flag: '🇲🇽' },
    '54': { country: 'Argentina', flag: '🇦🇷' },
    '55': { country: 'Brasil', flag: '🇧🇷' },
    '56': { country: 'Chile', flag: '🇨🇱' },
    '57': { country: 'Colombia', flag: '🇨🇴' },
    '58': { country: 'Venezuela', flag: '🇻🇪' },
    '591': { country: 'Bolivia', flag: '🇧🇴' },
    '592': { country: 'Guyana', flag: '🇬🇾' },
    '593': { country: 'Ecuador', flag: '🇪🇨' },
    '594': { country: 'Guayana Francesa', flag: '🇬🇫' },
    '595': { country: 'Paraguay', flag: '🇵🇾' },
    '596': { country: 'Martinica', flag: '🇲🇶' },
    '597': { country: 'Surinam', flag: '🇸🇷' },
    '598': { country: 'Uruguay', flag: '🇺🇾' },
    '501': { country: 'Belice', flag: '🇧🇿' },
    '502': { country: 'Guatemala', flag: '🇬🇹' },
    '503': { country: 'El Salvador', flag: '🇸🇻' },
    '504': { country: 'Honduras', flag: '🇭🇳' },
    '505': { country: 'Nicaragua', flag: '🇳🇮' },
    '506': { country: 'Costa Rica', flag: '🇨🇷' },
    '507': { country: 'Panamá', flag: '🇵🇦' },
    '51': { country: 'Perú', flag: '🇵🇪' },
    '53': { country: 'Cuba', flag: '🇨🇺' },
    '54': { country: 'Argentina', flag: '🇦🇷' },
    '55': { country: 'Brasil', flag: '🇧🇷' },
    '509': { country: 'Haití', flag: '🇭🇹' },
    '591': { country: 'Bolivia', flag: '🇧🇴' },
    '297': { country: 'Aruba', flag: '🇦🇼' },
    '876': { country: 'Jamaica', flag: '🇯🇲' },
    '595': { country: 'Paraguay', flag: '🇵🇾' },
    '509': { country: 'Haití', flag: '🇭🇹' },
    '505': { country: 'Nicaragua', flag: '🇳🇮' },
    '506': { country: 'Costa Rica', flag: '🇨🇷' },
    '507': { country: 'Panamá', flag: '🇵🇦' },
    '51': { country: 'Perú', flag: '🇵🇪' },
    '53': { country: 'Cuba', flag: '🇨🇺' },
    '501': { country: 'Belice', flag: '🇧🇿' },
    '590': { country: 'San Martín', flag: '🇸🇽' },
    '599': { country: 'Antillas Neerlandesas', flag: '🇨🇼' },
    '591': { country: 'Bolivia', flag: '🇧🇴' }
    // Puedes seguir añadiendo más países si es necesario
  }
  return countries[code] || { country: 'Desconocido', flag: '🏳️' }
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler
