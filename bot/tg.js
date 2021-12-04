const TelegramBot = require("node-telegram-bot-api");
const superagent = require("snekfetch");
const cleverbot = require("cleverbot-free");
const { get } = require("superagent");
const TOKEN = process.env.telegram
const bot = new TelegramBot(TOKEN, { polling: true });
const OP = ["your_nickname"];
const { RedditSimple } = require("reddit-simple");

bot.on("message", function(msg) {
  var message = msg;
  let cid = msg.chat.id;
  function reply(t) {
    bot.sendMessage(cid, t);
  }

  if (msg.text == "/start") reply("ah yes pt on telegram");
  if (msg.text.startsWith("pt!cmm") || msg.text.startsWith("/cmm")) {
    var metinb = msg.text
      .split(" ")
      .slice(1)
      .join(" ");

    if (!metinb) return reply(`Lütfen bir mesaj giriniz!`);
    let url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${metinb}`;
    get(url).then(res => {
      bot.sendPhoto(msg.chat.id, res.body.message);
    });
  }

  if (
    msg.text == "pt!yardım" ||
    msg.text == "/yardım" ||
    msg.text == "/yardım@poketalebot"
  )
    reply(
      "prefix:pt! ve / \n meme --> meme atar lol  \n ai ---> yapay zeka ile konuşursunuz \n cmm --> çeynç may mend"
    );
  if (msg.text.startsWith("pt!ai") || msg.text.startsWith("/ai")) {
    var metin = msg.text
      .split(" ")
      .slice(1)
      .join(" ");
    let yazı = metin
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ı/g, "i")
      .replace(/ç/g, "c")
      .replace(/ş/g, "s");
    if (!metin) return reply("birşey yazın");
    cleverbot(yazı).then(cevap => reply(cevap));
  }
  if (msg.text.startsWith("pt!yaz") || msg.text.startsWith("/yaz")) {
    var metin = msg.text
      .split(" ")
      .slice(1)
      .join(" ");
    if (!metin) return reply("za");
    reply(metin);
  }
  if (msg.text == "pt!meme" || msg.text == "/meme@poketalebot")
    return RedditSimple.RandomPost("memes").then(res => {
      bot.sendPhoto(msg.chat.id, res[0].data.url, {
        caption: res[0].data.title
      });
    });

  if (msg.text.startsWith("pt!eval") && OP.includes(msg.from.username)) {
    var codein = msg.text
      .split(" ")
      .slice(1)
      .join(" ");
    function evv(ev) {
      return require("util").inspect(eval(ev));
    }
    reply(evv(codein));
  }
});
