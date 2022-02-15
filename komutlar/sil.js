const Discord = require('discord.js');

exports.run = function(client, message, args) {
  const sayi = args.slice(0).join('');
  
if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyok = new Discord.MessageEmbed()
          .setDescription("**❌ `Yönetici` İznine Sahip Olmalısın!**")
          .setColor("RED")
          return message.channel.send(yetkinyok)
} else {
if(sayi.length < 1) {
  return message.reply(":x: **Silmem İçin Bir Miktar Belirt**")
}
 if (sayi.length > 100){
   return message.reply(":x: **En Fazla 100 Mesaj**")
 } else {
   message.channel.bulkDelete(sayi);
     message.channel.send(`:renklicop: ** ${sayi} Mesaj Çöp Kutusuna Atıldı**`).then(msg => {
       msg.delete({ timeout: 2500 }) // 1000 = 1 saniye
     })
}
}
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['sil'],
  permLevel: 0 
};

exports.help = {
  name: 'temizle',
  description: 'Belirtilen miktarda mesaj siler',
  usage: 'temizle '
}; 
 