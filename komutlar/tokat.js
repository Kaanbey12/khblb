const Discord  = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  let member = message.mentions.users.first()
  
 var cevaplar = [`<@${message.author.id}> Adlı Kullanıcı ${member} adlı kullanıcıya tokat attı fakat dayak yedi .C`, 
                 `<@${message.author.id}> Adlı Kullanıcı ${member} adlı kullanıcının ağzını kırdı `
                ];
 var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)]; 
 const ping = new Discord.MessageEmbed()
  .setColor(2828)
  .setDescription("🖐" + cevap)
  .setImage(`https://c.tenor.com/nmEa-Paa3XgAAAAd/the-slap2-slap.gif`)
 message.channel.send(ping)
};

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0
 };

 exports.help = {
   name: 'tokat',
   description: 'Boks makinesine vurur.',
   usage: 'boks-makinesi'
} 
 