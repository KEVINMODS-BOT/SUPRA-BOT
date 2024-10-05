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

        // Crear el mensaje de usuarios registrados
        let userList = registeredUsers.join('\n║      🟢 '); // Formato con icono verde y saltos de línea

        // Información de los usuarios
        let info = `
╔══════════════════════════╗
║   𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 ℝ𝕖𝕘𝕚𝕤𝕥𝕣𝕒𝕕𝕠𝕤  ║
╠══════════════════════════╣
║      𝕌𝕤𝕦𝕒𝕣𝕚𝕠𝕤 🟢      ║
${userList}
╚══════════════════════════╝
        `;

        // URL del GIF
        let gifUrl = 'https://giphy.com/gifs/HAyv9qZqzExP0ZQOrt'; // Cambia esta URL si lo necesitas

        // Verificar si el GIF es accesible (esto es opcional pero útil)
        if (!gifUrl) {
            console.log('La URL del GIF no es válida');
            return conn.reply(m.chat, 'Error al obtener el GIF.', m);
        }

        // Enviar el GIF junto con el mensaje de usuarios
        await conn.sendFile(m.chat, gifUrl, 'usuarios.gif', info, m, { mentions: registeredUsers });
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
