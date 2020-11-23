const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const ffmpeg = require('ffmpeg');
const ffmpegstatic = require('ffmpeg-static');
const fetch = require("node-fetch");
const db = require("quick.db");
const client = new Discord.Client();


////////////

const prefix = "h"



require("express")().listen(1343);


setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Hi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`${prefix}uptime |  ${db.get("linkler").length} Bot / ${client.guilds.size} Servers`)
  console.log(`Bot Is Ready`)
})



client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == prefix + "uptime") {// هنا امر تشغيل البوت
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("This link Is Already On System !!")
    message.reply("Done Uptimed Your Project Now 24/7");// هنا الرسالة الي بيبعتها
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("" + e)
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == prefix + "botnum") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} Bot/Project Uptime In Progress.!`)
}})
 




client.on('message', message => {
const moment = require("moment")
require("moment-duration-format")
if (message.content === prefix + "info") {
message.channel.send(`**بينج البوت = ${client.ping} ms
عدد السيرفرات الموجود بها البوت = ${client.guilds.size}
اجمالي المستخدمين = ${client.users.size}
**`)
}});




client.on('message', message => {
  var helplist = `**:notes:  قائمة الاوامر  

> ${prefix}uptime + Link : لتشغيل بوت 24 ساعه
> ${prefix}info : لمعرفة معلومات عن البوت
> ${prefix}botnum : لمعرفة عدد البوتات المرفوعه علي البوت
**`
  if(message.content === prefix + 'help') {
            message.delete(1000)
    let e = '** جاري الارســال .. :envelope_with_arrow: **'
	  message.reply(e).then(m => m.delete(1000))
	  message.author.send(helplist).catch(error => message.reply('** لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :negative_squared_cross_mark:**'))
}
});

const log = message => {
  console.log(`${message}`);
}
  
  ///


client.login(process.env.token);
