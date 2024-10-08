import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata, text, isAdmin }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/ylgu47w3');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  // Comando .setwelcome para configurar la bienvenida personalizada
  if (text.startsWith('.setwelcome') && isAdmin) {
    let welcomeMessage = text.slice(11).trim();
    chat.customWelcome = welcomeMessage;
    await conn.sendMessage(m.chat, 'Mensaje de bienvenida configurado con éxito.', 'conversation');
  }

  // Comando .setbye para configurar el mensaje de despedida personalizado
  if (text.startsWith('.setbye') && isAdmin) {
    let byeMessage = text.slice(8).trim();
    chat.customBye = byeMessage;
    await conn.sendMessage(m.chat, 'Mensaje de despedida configurado con éxito.', 'conversation');
  }

  // Mensaje de bienvenida
  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = chat.customWelcome 
      ? chat.customWelcome.replace('@user', `@${m.messageStubParameters[0].split`@`[0]}`).replace('@group', groupMetadata.subject)
      : `@${m.messageStubParameters[0].split`@`[0]} *BIENVENIDO A* ${groupMetadata.subject}\n\n*PUEDE LEER LAS REGLAS DEL GRUPO Y ASÍ EVITAR QUE TE ELIMINEN*\n${groupMetadata.desc}`;
    
    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo);
  }

  // Mensaje de despedida
  if (chat.bienvenida && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = chat.customBye 
      ? chat.customBye.replace('@user', `@${m.messageStubParameters[0].split`@`[0]}`)
      : `@${m.messageStubParameters[0].split`@`[0]} *SE FUE DEL GRUPO*`;
    
    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo);
  }
}
