	const Discord = require('discord.js');
exports.run = (client, message, args) => {
    if (!message.member.hasPermissions("MUTE_MEMBERS")) return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Üyeleri sustur` yetkisine sahip olmanız gerek.")
    let kullanici = message.mentions.members.first()
    let reason = args[1];
    if (!kullanici) return message.channel.send("Kimi susturacağını belirtmedin")
    kullanici.setMute(true, `${reason}. Susturan kişi ${message.author.tag}`)
        .then(() =>
            message.channel.send(`${kullanici} adlı kullanıcının mikrofonu kapatıldı`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['m-kapat', 'seslidesustur'],
    permLevel: 0
};