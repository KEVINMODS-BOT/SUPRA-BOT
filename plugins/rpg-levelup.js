// Lista de usuarios registrados (esto puede venir de una base de datos)
let registeredUsers = [
    '@usuario1',
    '@usuario2',
    '@usuario3',
    // Añade más usuarios aquí...
];

let handler = async (m, { conn }) => {
    // Si no hay usuarios registrados
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

    // Enviar el GIF junto con el mensaje de usuarios
    let gifUrl = 'https://qu.ax/gJBVt.mp4'; // URL del GIF
    await conn.sendFile(m.chat, gifUrl, 'usuarios.gif', info, m, { mentions: registeredUsers });
};

handler.help = ['usuarios'];
handler.tags = ['general']; // No es exclusivo de grupos
handler.command = /^usuarios$/i;
handler.group = false; // Puede funcionar fuera de grupos
handler.admin = false; // No requiere ser admin

