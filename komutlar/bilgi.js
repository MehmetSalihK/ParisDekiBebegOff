const Discord = require('discord.js');
const moment = require("moment");

const status = {
    online: "<a:online:639312973177028610>Çevrimiçi",
    idle: "<a:bosta:639312929954725918>Meşgul",
    dnd: "<a:rahatsizetme:639312947587448842>Rahatsız Etme",
    offline: "<a:offline:639312972178522113>Çevrimdışı"
};

exports.run = (bot, message, args) =>{
  let inline = true
    var permissions = [];
    var acknowledgements = 'Değil';
   
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); }); 
    
    if(message.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Üyeleri Kick'ler");
    }
    
    if(message.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Üyeleri Ban'lar");
    }
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Yönetici");
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Mesajları Yönet");
    }
    
    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Kanalları Yönet");
    }
    
    if(message.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Herkesden bahset");
    }

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Takma Adları Yönet");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Rolleri Yönet");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Web Kancalarını Yönet");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Emojiyi Yönet");
    }

    if(permissions.length == 0){
        permissions.push("Anahtar İzni Bulunamadı");
    }

    if(`<@${member.user.id}>` == message.guild.owner){
        acknowledgements = 'Sunucu Sahibisin';
    }

    const embed = new Discord.RichEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor(randomColor)
        .setFooter(`ID: ${message.author.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField(`Durum`,`${status[member.user.presence.status]}`, true)
        .addField('Katıldığı tarih ',`\`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``, true)
        .addField("Oyun", `${member.user.presence.game ? `<a:oyun:643072579438903316> \`${member.user.presence.game.name}\`` : "<a:oyun:643072579438903316> \`oynamıyor\`"}`,inline, true)
        .addField("Discord Hesabı ",`\`${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} oluşturuldu\``, true)
        .addField("Ruhsatlar ", `\`${permissions.join(' | ')}\``, true)
        .addField(`Rol [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Rolüm Yok"}`, true)
        .addField("Sunucu Sahibi ", `\`${acknowledgements}\``, true);
        
    message.channel.send({embed});

}