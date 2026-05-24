// import https from 'https';

// const BOT_TOKEN = '8812421234:AAG7HXpBtVyoRDKJPP5zNjZJ8lIAEfHttC8';
// let lastUpdateId = 0;

// // Faqat arizalarning statuslari uchun matnlar qoldi
// const messages = {
//   uz: {
//     statusSuccess: '\n\n<b>Holati:</b> Yuborildi ✅',
//     statusError: '\n\n<b>Holati:</b> Yuborilmadi ❌',
//     alertSuccess: 'Buyurtma tasdiqlandi! ✅',
//     alertError: 'Buyurtma rad etildi! ❌'
//   },
//   ru: {
//     statusSuccess: '\n\n<b>Статус:</b> Отправлено ✅',
//     statusError: '\n\n<b>Статус:</b> Не отправлено ❌',
//     alertSuccess: 'Заказ подтвержден! ✅',
//     alertError: 'Заказ отклонен! ❌'
//   }
// };

// function telegramRequest(method, data) {
//   return new Promise((resolve, reject) => {
//     const postData = JSON.stringify(data);
//     const options = {
//       hostname: 'api.telegram.org',
//       port: 443,
//       path: `/bot${BOT_TOKEN}/${method}`,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(postData),
//       },
//     };

//     const req = https.request(options, (res) => {
//       let body = '';
//       res.on('data', (chunk) => (body += chunk));
//       res.on('end', () => {
//         try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
//       });
//     });

//     req.on('error', (e) => reject(e));
//     req.write(postData);
//     req.end();
//   });
// }

// async function checkUpdates() {
//   try {
//     const result = await telegramRequest('getUpdates', {
//       offset: lastUpdateId + 1,
//       timeout: 30,
//     });

//     if (result.ok && result.result && result.result.length > 0) {
//       for (const update of result.result) {
//         lastUpdateId = update.update_id;

//         // Inline Tugmalar bosilganda (Faqat arizalar holati uchun)
//         if (update.callback_query) {
//           const callbackQuery = update.callback_query;
//           const callbackData = callbackQuery.data;
//           const message = callbackQuery.message;
//           if (!message) continue;

//           const chatId = message.chat.id;
//           const messageId = message.message_id;

//           // Saytdan kelgan arizaning tugmalari bosilganda
//           if (callbackData.startsWith('status_')) {
//             const action = callbackData.split('_')[1]; // 'success' yoki 'error'
//             const originalText = message.text || '';

//             // JORIY TILNI ANIQLASH: Saytdan kelgan xabar matniga qarab avtomatik aniqlaydi
//             const joriyTil = originalText.includes("Новая заявка") ? 'ru' : 'uz';
            
//             let statusText = action === 'success' ? messages[joriyTil].statusSuccess : messages[joriyTil].statusError;
//             let alertText = action === 'success' ? messages[joriyTil].alertSuccess : messages[joriyTil].alertError;

//             // Xabarni yangilash va tugmalarni o'chirish
//             await telegramRequest('editMessageText', {
//               chat_id: chatId,
//               message_id: messageId,
//               text: `${originalText}${statusText}`,
//               parse_mode: 'HTML', // HTML formatda chiroyli chiqishi uchun
//               reply_markup: { inline_keyboard: [] }, 
//             });

//             // Tepadan chiqadigan bildirishnoma (alert)
//             await telegramRequest('answerCallbackQuery', {
//               callback_query_id: callbackQuery.id,
//               text: alertText,
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Xatolik:', error.message);
//   }

//   setTimeout(checkUpdates, 1000);
// }

// console.log('🚀 Sayt arizalari uchun tozalangan admin bot ishga tushdi...');
// checkUpdates();

// //////////////////////////

import TelegramBot from 'node-telegram-bot-api';

// 🛠️ BOT CONFIGURATION
const TELEGRAM_BOT_TOKEN = '8812421234:AAG7HXpBtVyoRDKJPP5zNjZJ8lIAEfHttC8';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

console.log("🚀 Velta xavfsiz admin boti ishga tushdi...");
console.log("🤖 Bot muvaffaqiyatli ulandi! Bot username: velta_pharma_bot");

// 📊 KUNLIK STATISTIKANI XOTIRADA SAQLASH TIZIMI
let dailyStats = {
  date: new Date().toLocaleDateString('uz-UZ'), // Bugungi sana
  totalRequests: 0,    // Jami kelib tushgan arizalar
  successRequests: 0,  // Muvaffaqiyatli yakunlanganlar
  errorRequests: 0     // Rad etilganlar / Xatoliklar
};

// Sanani tekshirish va yangi kunda statistikani nollash funksiyasi
function checkAndResetStats() {
  const today = new Date().toLocaleDateString('uz-UZ');
  if (dailyStats.date !== today) {
    dailyStats = {
      date: today,
      totalRequests: 0,
      successRequests: 0,
      errorRequests: 0
    };
    console.log(`📅 Yangi kun boshlandi (${today}). Statistika nolandi.`);
  }
}

// STATISTIKA MATNINI TAYYORLASH FUNKSIYASI (Kod takrorlanmasligi uchun)
function generateStatsMessage() {
  return `<b>📈 Velta Platformasi - Kunlik Statistika</b>\n\n` +
         `📅 <b>Sana:</b> ${dailyStats.date}\n` +
         `📥 <b>Jami kelib tushgan arizalar:</b> ${dailyStats.totalRequests} ta\n` +
         `✅ <b>Muvaffaqiyatli yuborildi:</b> ${dailyStats.successRequests} ta\n` +
         `❌ <b>Rad etildi / Xatolik:</b> ${dailyStats.errorRequests} ta\n\n` +
         `<i>Ma'lumotlar server xotirasida real vaqt rejimida hisoblanadi.</i>`;
}

// 💬 1. /start BUYRUG'I - IKKALA MENYUNI HAM BIR VAQTDA CHIQARADI
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "LORD"; // Foydalanuvchi ismi

  const welcomeText = `⚙️ <b>Velta | Ishchilar va Adminlar paneli</b>\n\n` +
                      `👋 Xush kelibsiz, <b>${firstName}</b>!\n\n` +
                      `🤖 Saytdan kelgan buyurtmalarni boshqarish va bugungi jonli hisobotni ko'rish uchun quyidagi tugmadan foydalaning.`;

  bot.sendMessage(chatId, welcomeText, {
    parse_mode: 'HTML',
    reply_markup: {
      // 🟩 Xabar ostidagi Inline Tugma (Rasmdagidek)
      inline_keyboard: [
        [
          { text: "📊 Kunlik Statistika (Jonli)", callback_data: "get_daily_stats" }
        ]
      ],
      // ⌨️ Yozish maydonidagi kvadrat menu tugmasi (Rasmdagidek)
      keyboard: [
        [
          { text: "📊 Kunlik statistika" }
        ]
      ],
      resize_keyboard: true,    // Tugmani chiroyli va ixcham o'lchamga keltiradi
      one_time_keyboard: false  // Tugma klaviaturada doimiy ko'rinib turadi
    }
  });
});

// 💬 2. KELAYOTGAN XABARLARNI FILTRLASH (Menu tugmasi yoki matn yozilganda)
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // Agar foydalanuvchi pastdagi Menu tugmasini bossa yoki qo'lda "/statistika" deb yozsa
  if (text === "📊 Kunlik statistika" || text === "/statistika") {
    checkAndResetStats();
    try {
      const statsText = generateStatsMessage();
      await bot.sendMessage(chatId, statsText, { parse_mode: 'HTML' });
    } catch (error) {
      console.error("Statistika yuborishda xatolik:", error.message);
    }
    return; // Qolgan qismlarga o'tib ketmasligi uchun zanjirni to'xtatamiz
  }

  // Saytdan arizalar (React'dan) guruhga bot orqali kelganda avtomat sanash qismi
  if (text.includes("Yangi murojaat") || text.includes("Новая заявка")) {
    checkAndResetStats();
    dailyStats.totalRequests += 1;
    console.log(`📥 Yangi ariza keldi. Bugungi jami arizalar: ${dailyStats.totalRequests}`);
  }
});

// 🔔 3. INLINE TUGMALAR BOSILGANDA ISHLAYDIGAN QISM (Callback Query)
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  const currentText = query.message.text || "";

  checkAndResetStats();

  try {
    // Admin arizani ostidagi "Yuborildi ✅" tugmasini bossa
    if (data.startsWith('status_success_')) {
      dailyStats.successRequests += 1;
      const updatedText = `${currentText}\n\n<b>Holati:</b> Yuborildi ✅`;
      
      await bot.answerCallbackQuery(query.id, { text: "Buyurtma yuborildi deb belgilandi!" });
      await bot.editMessageText(updatedText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: "📊 Kunlik Statistika (Jonli)", callback_data: "get_daily_stats" }]]
        }
      });
    }
    // Admin arizani ostidagi "Yuborilmadi ❌" tugmasini bossa
    else if (data.startsWith('status_error_')) {
      dailyStats.errorRequests += 1;
      const updatedText = `${currentText}\n\n<b>Holati:</b> Yuborilmadi ❌`;
      
      await bot.answerCallbackQuery(query.id, { text: "Buyurtma rad etildi!" });
      await bot.editMessageText(updatedText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: "📊 Kunlik Statistika (Jonli)", callback_data: "get_daily_stats" }]]
        }
      });
    }
    // Xabar ostidagi "📊 Kunlik Statistika (Jonli)" inline tugmasi bosilganda
    else if (data === "get_daily_stats") {
      const statsText = generateStatsMessage();
      await bot.answerCallbackQuery(query.id, { text: "Statistika yangilandi!" });
      await bot.sendMessage(chatId, statsText, { parse_mode: 'HTML' });
    }
  } catch (error) {
    console.error("Callback mantiqida xatolik:", error.message);
  }
});

// Server kutilmaganda o'chib qolmasligi uchun global xatoliklarni ushlash
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});