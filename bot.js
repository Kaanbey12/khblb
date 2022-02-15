const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
const http = require("http");
const express = require("express");
const fetch = require('node-fetch');
const app = express();

client.on("ready", async () => {
client.user.setActivity(`.uptime`, { type: "PLAYING" });
  console.log("`");
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`
    
   :negative_squared_cross_mark: **Proje Sistemimizde Zaten Bulunuyor ** 

    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    **:white_check_mark: Yazdığınız Proje Başarıyla Uptime Sistemimize Eklendi.**
    `)
    .addField('```.linkler```','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//yDarKDayS
    .setTimestamp()
    message.channel.send(success)
    
    client.channels.cache.get('KANAL İD').send(botdm)
    const botdm = new Discord.MessageEmbed()
      .setTitle("Yeni Bir UPTİME!")
      .setTimestamp()
      .setColor("BLUE")
      .setFooter("BG")
      .setThumbnail(`${message.author.avatarURL()}`)
      .addField("Gönderen", message.author.tag)
      .addField("Gönderen ID", message.author.id)
      .addField("Gönderilen Mesaj", Link);
    
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setDescription(`

  **:negative_squared_cross_mark: Hey Uptime Edeceğim URL Girmelisin! **

> .ekle (Glitch Show Linki)
  `)
  .setThumbnail(message.author.avatarURL)
  message.channel.send(dijitaluptime)
  })
  }



  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`
  
☀️** Şuanda  \`${db.get('Proje')}\` URL'yi 7/24 Aktif Tutuyor. **
☀️**  Bu Linklerden Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Senin URl'ni Uptime ediyor!**
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'uptime') {
  const pxd = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  
  .setDescription(`


`)
  .addField('** Maxi Uptime **',`
- **.ekle (glitch show linki)** = Botunuzu 7/24 Aktif Tutar.
- **.linkler** = 7/24 Tuttuğum linklerini gösterir.
- **.say** = Tüm Uptime edilmiş bot sayısını gösterir.
`)
  .addField('------------------------------------------------------',`
[Destek Sunucu](https://discord.gg/xB2VurEjRU)`)

  message.channel.send(pxd)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`\<a:driphearts:906521077541371925> **Hiç link eklememişsin. Üzdün Beni Dostum Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`- **7/24 Aktfi Tuttuğum botlarınızın linklerini daha güvenli olduğunda DM üzerinden gönderdim ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor('#F39de8').setDescription(`- ** Uptime Ettigin Linklerin:** \n\n\``+Linkleri.join('\n')+`\`

 (Uptime Hizmeti Yenilendi)`).setThumbnail(message.author.avatarURL))
    }


})




client.on('ready', () => {
client.user.setActivity(`+ekle (Kısa Link)`, { type: 'PLAYING' })
client.user.setStatus('online')
  
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["509417115439071233"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}

client.on('message', message => {
  const codemarefireklamliste = ['.glitch.me/','.glitch.me']
  if(codemarefireklamliste.some(codemarefi => message.content.includes(codemarefi))){
    // Lin Atarsa Mesajı Silelim
    message.delete()

    // Uyaralım
    const keslan = new Discord.MessageEmbed()
    .setDescription(`- **Projeniz 3 4 dakika içinde eklenicektir :) ${message.author}**
Lütfen spam ATMAYINIZ`  )
    .setColor('#F32b39')
    message.channel.send(keslan) .then(msg => msg.delete({ timeout: 9000}));
  }
})

//tokenininizi giriniz.
client.login(process.env.token);
client.on("message" , message => {
  if(!message.guild) return;
  if(message.content.startsWith(ayarlar.prefix + 'afk')) return;

  let codemarefiafk = message.mentions.users.first()
  let codemarefikisi = db.fetch(`kisiid_${message.author.id}_${message.guild.id}`)
  let codemarefikisiisim = db.fetch(`kisiisim_${message.author.id}_${message.guild.id}`)

  if(codemarefiafk){
    let cmfsebep = db.fetch(`cmfsebep_${codemarefiafk.id}_${message.guild.id}`)
    let codemarefikisi2 = db.fetch(`kisiid_${codemarefiafk.id}_${message.guild.id}`)

    if(message.content.includes(codemarefikisi2)){
      const cmfbilgiafk = new Discord.MessageEmbed()
      .setDescription(`${message.author} - Etiketlemiş Olduğun <@!${codemarefikisi2}> Kişisi Şuan **${cmfsebep}** Sebebiyle AFK`)
      .setColor("#36393F")
      .setFooter('XroY | AFK')
      message.channel.send(cmfbilgiafk)
    }
  }

  if(message.author.id === codemarefikisi){

    db.delete(`cmfsebep_${message.author.id}_${message.guild.id}`)
    db.delete(`kisiid_${message.author.id}_${message.guild.id}`)
    db.delete(`kisiisim_${message.author.id}_${message.guild.id}`)

    
    message.member.setNickname(codemarefikisiisim)

    const cmfbilgiafk = new Discord.MessageEmbed()
    .setAuthor(`Hoşgeldin ${message.author.username}`, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`<@!${codemarefikisi}> Başarılı Bir Şekilde **AFK** Modundan Çıkış Yaptın.`)
    .setColor("#36393F")
    .setFooter('Maxi | AFK')
    message.channel.send(cmfbilgiafk)
  }  
}) 
