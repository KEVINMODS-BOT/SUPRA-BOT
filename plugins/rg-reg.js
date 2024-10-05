import { createHash } from 'crypto';
import fs from 'fs';
import fetch from 'node-fetch';

// RegEx para el registro
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    let name2 = conn.getName(m.sender);
    
    // Si se usa el comando de registro
    if (command === 'register' || command === 'reg' || command === 'verify') {
        // Verificar si el usuario ya está registrado
        if (user.registered === true) return m.reply(`🚩 Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg* <Número de serie>`);

        // Validar el formato de entrada
        if (!Reg.test(text)) return m.reply(`🚩 Formato incorrecto.\n\nUso del comando: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.16*`);

        let [_, name, splitter, age] = text.match(Reg);

        // Validaciones
        if (!name) return m.reply('🚩 El nombre no puede estar vacío.');
        if (!age) return m.reply('🚩 La edad no puede estar vacía.');
        if (name.length >= 100) return m.reply('🚩 El nombre es demasiado largo.');
        
        age = parseInt(age);
        if (age > 100) return m.reply('👴🏻 Wow el abuelo quiere jugar al bot.');
        if (age < 5) return m.reply('🚼  hay un abuelo bebé jsjsj.');

        // Registro del usuario
        user.name = name.trim();
        user.age = age;
        user.regTime = +new Date();
        user.registered = true;

        // Generar número de serie
        let sn = createHash('md5').update(m.sender).digest('hex');
        let img = await (await fetch(`https://qu.ax/KFrad.jpg`)).buffer();

        // Mensaje de registro
        let txt = ` –  *R E G I S T R O  -  U S E R*\n\n`;
        txt += `┌  ✩  *Nombre* : ${name}\n`;
        txt += `│  ✩  *Edad* : ${age} años\n`;
        txt += `│  ✩  *Número de serie*\n`;
        txt += `└  ✩  ${sn}`;

        await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m);
        await m.react('✅');
    } 

    // Si se usa el comando de mostrar usuarios
    else if (command === 'usuarios') {
        try {
            // Contar usuarios registrados
            let totalRegistered = Object.values(global.db.data.users).filter(user => user.registered).length;

            // Información de los usuarios
            let info = `
╔══════════════════════════╗
║   𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 ℝ𝕖𝕘𝕚𝕤𝕥𝕒𝕕𝕠𝕤  ║
╠══════════════════════════╣
║      𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 🟢 : ${totalRegistered}      ║
╚══════════════════════════╝
            `;

            // Enviar mensaje con el número de usuarios registrados
            await conn.sendMessage(m.chat, { text: info });
        } catch (err) {
            console.error('Error al mostrar usuarios registrados:', err);
            conn.reply(m.chat, 'Hubo un error al mostrar los usuarios registrados.', m);
        }
    }
}

// Comandos de manejo
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*');
handler.tags = ['rg'];
handler.command = ['verify', 'reg', 'register', 'registrar', 'usuarios']; // Aquí se incluye el comando 'usuarios'

export default handler;
