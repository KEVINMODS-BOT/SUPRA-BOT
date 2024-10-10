import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        let user = global.db.data.users[m.sender];
        
        // Verificar si el usuario está registrado
        if (!user.registered) {
            conn.reply(m.chat, 'Por favor, regístrate usando el comando `.reg nombre.edad` antes de usar este comando.', m);
            return;
        }

        // Verificar el comando de compra
        if (command === 'comprarharem') {
            let res = await fetch('https://api.waifu.pics/sfw/waifu');
            if (!res.ok) return;
            let json = await res.json();
            if (!json.url) return;

            let haremPrice = obtenerPrecioAleatorio(); // Precio aleatorio de 10, 15, o 20 créditos

            if (user.limit < haremPrice) {
                conn.reply(m.chat, `No tienes suficientes créditos para comprar este harem. Necesitas ${haremPrice} créditos.`, m);
                return;
            }

            user.limit -= haremPrice;
            user.harem = user.harem || [];
            user.harem.push(json.url); // Almacenar la URL del harem en la base de datos del usuario

            conn.sendFile(m.chat, json.url, 'thumbnail.jpg', `Has comprado un harem por ${haremPrice} créditos.\n\n .misharem  Para ver tu harem\n\n .venderharem número del harem   Para vender tu harem`, m);
        }

        // Verificar el comando de venta
        if (command === 'venderharem') {
            let haremIndex = parseInt(args[0]) - 1;

            if (!user.harem || user.harem.length === 0) {
                conn.reply(m.chat, 'No tienes harem para vender.', m);
                return;
            }

            if (haremIndex < 0 || haremIndex >= user.harem.length) {
                conn.reply(m.chat, 'Elige un harem válido para vender.', m);
                return;
            }

            let sellPrice = determinarPrecio(); // Determinar el precio de venta basado en la probabilidad
            let probabilidad = determinarProbabilidad(sellPrice); // Determinar la probabilidad de venta

            if (Math.random() * 100 <= probabilidad) {
                user.limit += sellPrice;
                user.harem.splice(haremIndex, 1); // Eliminar el harem de la lista del usuario
                conn.reply(m.chat, `¡Venta exitosa! Has vendido un harem por ${sellPrice} créditos.`, m);
            } else {
                conn.reply(m.chat, `Lo siento, no pudiste vender el harem esta vez. Inténtalo de nuevo más tarde.`, m);
            }
        }

        // Mostrar los harem que tiene el usuario
        if (command === 'misharem') {
            if (!user.harem || user.harem.length === 0) {
                conn.reply(m.chat, 'No tienes harem. Compra uno con el comando `.comprarharem`.', m);
                return;
            }

            let haremList = user.harem.map((url, i) => `${i + 1}. ${url}`).join('\n');
            conn.reply(m.chat, `Este es tu harem:\n\n${haremList}\n\nUsa \`.venderharem [número]\` para vender un harem.`, m);
        }

    } catch (e) {
        console.log(e);
        conn.reply(m.chat, 'Hubo un error al procesar tu solicitud.', m);
    }
};

// Función para obtener un precio aleatorio de compra (10, 15, o 20 créditos)
function obtenerPrecioAleatorio() {
    const precios = [10, 15, 20];
    return precios[Math.floor(Math.random() * precios.length)];
}

// Función para determinar el precio de venta basado en probabilidades
function determinarPrecio() {
    const precios = [5, 10, 15, 30];
    const probabilidades = [0.45, 0.30, 0.20, 0.05];
    let random = Math.random();
    let acumulado = 0;

    for (let i = 0; i < precios.length; i++) {
        acumulado += probabilidades[i];
        if (random <= acumulado) {
            return precios[i];
        }
    }

    return precios[0]; // Por defecto
}

// Función para determinar la probabilidad de venta según el precio
function determinarProbabilidad(precio) {
    switch (precio) {
        case 5:
        case 6:
        case 7:
            return 90;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
            return 80;
        case 15:
            return 70;
        case 16:
            return 60;
        case 17:
            return 50;
        case 18:
            return 40;
        case 19:
            return 30;
        case 30:
            return 5;
        default:
            return 0; // Sin probabilidad
    }
}

handler.help = ['comprarharem', 'venderharem [número]', 'misharem'];
handler.tags = ['img', 'econ'];
handler.command = /^(comprarharem|venderharem|misharem)$/i;
handler.register = true;

export default handler;
