let handler = async (m, { conn }) => {
    // Obtener metadata del grupo
    let chat = await conn.groupMetadata(m.chat);

    // Obtener lista de usuarios
    let users = chat.participants.map(p => '@' + p.id.split('@')[0]);

    // Si no hay usuarios registrados
    if (users.length === 0) {
        return conn.reply(m.chat, 'No hay usuarios registrados en este grupo.', m);
    }

    // Crear el mensaje de usuarios registrados
    let userList = users.join('\n║      🟢 '); // Formato con icono verde y saltos de línea

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
    await conn.sendFile(m.chat, gifUrl, 'usuarios.gif', info, m, { mentions: users });
};

handler.help = ['usuarios'];
handler.tags = ['group'];
handler.command = /^usuarios$/i;
handler.group = false; // Solo funcionará en privado
handler.admin = false; // No requiere ser admin

export default handler;
