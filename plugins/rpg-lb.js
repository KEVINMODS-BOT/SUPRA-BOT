let handler = async (m, { conn, args, usedPrefix }) => {
    // Verificar si el usuario proporcionó un mensaje
    if (!args[0]) return m.reply(`Por favor, proporciona el texto del reporte. Ejemplo: ${usedPrefix}reporte El comando .s no funciona`);

    let reportMessage = args.join(' '); // Unir todos los argumentos como el mensaje de reporte
    let user = `@${m.sender.split('@')[0]}`; // Obtener el nombre de usuario del remitente

    let mensaje = `*MENSAJE DE REPORTE:*\n\n${reportMessage}\n\n*Reporte enviado por* ${user}`;

    try {
        // Enviar el mensaje al número de reporte
        await conn.sendMessage('+51925015528@s.whatsapp.net', { text: mensaje });
        m.reply('Tu reporte ha sido enviado correctamente.');
    } catch (e) {
        m.reply('Hubo un error al enviar tu reporte. Por favor, intenta de nuevo.');
    }
};

handler.help = ['reporte'];
handler.tags = ['info'];
handler.command = /^reporte$/i;

export default handler;
