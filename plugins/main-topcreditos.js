
let handler = async (m, { conn }) => {
    let users = Object.entries(global.db.data.users)
        .filter(([jid, user]) => user.registered)
        .sort(([, a], [, b]) => b.limit - a.limit)
        .slice(0, 29); // Top 29 usuarios

    let str = '▂▃▄▅▆▇█▓▒░ 𝐓𝐎𝐏 👑 ░▒▓█▇▆▅▄▃▂\n\n';

    users.forEach(([jid, user], index) => {
        let rank;
        if (user.limit >= 1700) rank = '💮 LEYENDA';
        else if (user.limit >= 1200) rank = '🃏 MAESTRO';
        else if (user.limit >= 700) rank = '💎 DIAMANTE';
        else if (user.limit >= 300) rank = '🥇 ORO';
        else if (user.limit >= 100) rank = '🥈 PLATA';
        else rank = '🥉 BRONCE';

        str += `${index + 1})\n*[👤] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:* ${conn.getName(jid)}\n*[📱] 𝙽𝚄𝙼𝙴𝚁𝙾:* https://wa.me/${jid.split('@')[0]}\n*[💸] 𝙲𝚁𝙴́𝙳𝙸𝚃𝙾𝚂:* ${user.limit}\n*[🔱] 𝚁𝙰𝙽𝙶𝙾:* ${rank}\n\n`;
    });

    let imageUrl = 'https://qu.ax/ubjdp.jpg';
    await conn.sendFile(m.chat, imageUrl, 'topcreditos.jpg', str.trim(), m);
}

handler.help = ['topcreditos'];
handler.tags = ['econ'];
handler.command = /^topcreditos$/i;

export default handler;
