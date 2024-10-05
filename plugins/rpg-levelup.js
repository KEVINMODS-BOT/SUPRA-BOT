// Lista de usuarios registrados (esto puede venir de una base de datos)
let registeredUsers = [
    '@usuario1',
    '@usuario2',
    '@usuario3',
    // Añade más usuarios aquí...
];

let handler = async (m, { conn }) => {
    try {
        // Verificación de usuarios registrados
        if (registeredUsers.length === 0) {
            return conn.reply(m.chat, 'No hay usuarios registrados.', m);
        }

        // Obtener el número de usuarios registrados
        let numberOfUsers = registeredUsers.length;

        // Información de los usuarios
        let info = `
╔══════════════════════════╗
║   𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 ℝ𝕖𝕘𝕚𝕤𝕥𝕒𝕕𝕠𝕤  ║
╠══════════════════════════╣
║      𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 🟢 :  ${rtotalreg}      ║
╚══════════════════════════╝
        `;

        // URL del GIF (debe ser un enlace directo al GIF)
        let gifUrl = 'https://media.giphy.com/media/HAyv9qZqzExP0ZQOrt/giphy.gif'; // URL directa del GIF

        // Enviar el GIF junto con el mensaje de usuarios
        await conn.sendMessage(m.chat, { 
            text: info, 
            mentions: [m.sender] 
        });
        await conn.sendFile(m.chat, gifUrl, 'usuarios.gif', '', m);
        console.log('Mensaje enviado correctamente');

    } catch (err) {
        console.error('Error al ejecutar el comando:', err);
        conn.reply(m.chat, 'Hubo un error al ejecutar el comando.', m);
    }
};

handler.help = ['usuarios'];
handler.tags = ['general']; // No es exclusivo de grupos
handler.command = /^usuarios$/i;
handler.group = false; // Puede funcionar fuera de grupos
handler.admin = false; // No requiere ser admin

export default handler;
