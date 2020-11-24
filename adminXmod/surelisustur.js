const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async(client, message, args) => {
let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek.");
 if (user.hasPermission("BAN_MEMBERS")) return message.channel.send(`Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`)
let log = await db.fetch(`mlog_${message.guild.id}`)
  if (!log) return message.channel.send("Ayarlı Bir Mute Log Kanalı Yok! Ayarlamak için \`-mute-log #kanal\` !")  
var mod = message.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return message.reply('Kullanıcı Etiketlemedin')
 if (!reason) return message.reply('Süre Belirtmedin! Seçeneklerin : 1s/1m/1h/1d/1w')
if (!sebep) return message.reply('Sebep Belirtmedin!')
 
 
 
  let mute = message.guild.roles.find(r => r.name === "Susturuldu");
         
  let mutetime = args[1]
if(!mute){
      mute = await message.guild.createRole({
        name: "Susturuldu",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
 
    }
 
 
  await(user.addRole(mute.id));
message.channel.send(``)
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  message.channel.send(`${user} Adlı Kişi , ${mutezaman} Susturuldu! Sunucudan Çıkarsa Bile Mutesi Devam edecek!`)
db.set(`muteli_${message.guild.id + user.id}`, 'muteli')
db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, mutetime)
                         
  const muteembed = new Discord.RichEmbed()
        .setTitle('Ceza: Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`${mutezaman}\``)
  . setColor("RANDOM")
message.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`muteli_${message.guild.id + user.id}`)
    user.removeRole(mute.id)
 message.channel.send(`<@${user.id}> Muten açıldı.`)
  }, ms(mutetime));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 0
};
 
exports.help = {
  name: "mute",
  description: "",
  usage: ""
};