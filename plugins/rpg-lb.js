let handlerReporte = async (m, { conn, args, usedPrefix }) => {
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

let handlerAnonimo = async (m, { conn, args, usedPrefix }) => {
    // Verificar si el usuario proporcionó un mensaje
    if (!args[0]) return m.reply(`Por favor, proporciona el mensaje que quieres enviar de manera anónima. Ejemplo: ${usedPrefix}anonimo Este es un mensaje anónimo`);

    let anonymousMessage = args.join(' '); // Unir todos los argumentos como el mensaje anónimo

    let mensaje = `*MENSAJE ANÓNIMO:*\n\n${anonymousMessage}`;

    try {
        // Enviar el mensaje de manera anónima
        await conn.sendMessage('+51925015528@s.whatsapp.net', { text: mensaje });
        m.reply('Tu mensaje anónimo ha sido enviado correctamente.');
    } catch (e) {
        m.reply('Hubo un error al enviar tu mensaje anónimo. Por favor, intenta de nuevo.');
    }
};

// Configuración para el comando .reporte
handlerReporte.help = ['reporte'];
handlerReporte.tags = ['info'];
handlerReporte.command = /^reporte$/i;

// Configuración para el comando .anonimo
handlerAnonimo.help = ['anonimo'];
handlerAnonimo.tags = ['info'];
handlerAnonimo.command = /^anonimo$/i;

// Exportar ambos comandos
export { handlerReporte, handlerAnonimo };
