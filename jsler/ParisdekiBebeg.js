//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Discord = require('discord.js')
const {FriendlyError, SQLiteProvider} = require('discord.js-commando');
const fs = require("fs");
const ms = require("ms");
const db = require('quick.db')
const moment = require('moment');
const path = require('path');
const sqlite = require('sqlite');
const ayarlar = require('../ayarlar/ayarlar.json');

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client();

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
  

  
  if (message.content.toLowerCase() == `${prefix}tesd`){
    message.delete()
    const reactionFilter = (reaction, user) => reaction.emoji.name === '✅';

const embed = new Discord.RichEmbed({
  title: 'Suggestion by someone',
  description: 'This is a test suggestion. Can you please like it or dislike it :)',
  fields: [{
    name: 'Like:',
    value: '<3'
  }]
});

// add reaction emoji to message
message.channel.send(embed)
  .then(msg => msg.react('✅'))
  .then(mReaction => mReaction.message.react('❎'))
  .then(mReaction => {
    // createReactionCollector - responds on each react, AND again at the end.
    const collector = mReaction.message
      .createReactionCollector(reactionFilter, {
        time: 15000
      });

    // set collector events
    collector.on('collect', r => {
      // immutably copy embed's Like field to new obj
      let embedLikeField = Object.assign({}, embed.fields[0]);

      // update 'field' with new value
      embedLikeField.value = '<3 <3 <3';

      // create new embed with old title & description, new field
      const newEmbed = new Discord.RichEmbed({
        title: embed.title,
        description: embed.description,
        fields: [embedLikeField]
      });

      // edit message with new embed
      // NOTE: can only edit messages you author
      r.message.edit(newEmbed)
        .then(newMsg => console.log(`new embed added`))
        .catch(console.log);
    });
    collector.on('end', collected => console.log(`Collected ${collected.size} reactions`));
  })
  .catch(console.log);
  }
  
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return;

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix; 
  
  if (message.author.bot) return;

  // Split command into arguments
  args[0] = args[0]; // Make command case insensitive

  // Check type of command (first argument)
  switch (args[0]) {

    // case "!test":
    //  message.channel.sendMessage("Test Message!");
    // break;

    case (`${prefix}steam`):
     steam.getSteamUserData(message, args[1]);
     console.log("INFO: Received command: " + message);
    break;

    default:
     //message.channel.sendMessage("Wrong command! Check if the command is spelled correctly and try it again!");
    }

})


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', '📈à-rejoin📈');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Participant dans notre serveur : ', `${member}`)
        .addField(':microphone2: | Bienvenue!', `Bienvenue sur notre serveur, ${member}`)
        .addField(':id: | Utilisateur :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Vous êtes ', `${member.guild.memberCount}` + "ième personnes")
        .addField("Nom", `<@` + `${member.id}` + `>`, true)
        .addField('Serveur', `${member.guild.name}`, true )
        .setFooter(` Pour la commande d'aide [-aide]`, "https://imgur.com/rAgsGxu.png")
        .setTimestamp()

        channel.sendEmbed(embed);
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Canvas = require('canvas');
const snekfetch = require('snekfetch');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

bot.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
bot.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", bot.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = bot.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    
    const embedv11 = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setFooter(``)
    .setTimestamp()
    .addField('**Aramızdan Ayrıldı!**',`>  <a:7578_megaz:639312953883230208> <a:cikis:639319621010194455> ${member.user.tag}, Aramızdan Ayrıldı, \**${sayac[member.guild.id].sayi}\** Kişi Olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** Kişi Kaldı!`)
    
    giriscikiskanali.send(embedv11);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }//627222620080701449
 
});
bot.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", bot.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = bot.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    const embedv1 = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setFooter(``)
    .setTimestamp()
    .addField('**Aramıza Katıldı!**',`> <a:7578_megaz:639312953883230208> <a:giris:639319728804069406> ${member.user.tag}, Aramıza Katıldı, \**${sayac[member.guild.id].sayi}\** Kişi Olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** Kişi Kaldı!`)
    
    giriscikiskanali.send(embedv1);
    
     // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    
    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://cdn.glitch.com/38f634a6-4ba2-4aaf-9654-4c1cd5537bf3%2FwelcomeDiscordbotturk.jpg?1556935657174.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Assign the decided font to the canvas
	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	giriscikiskanali.send(``, attachment);   
     } catch (e) {
    return console.log(e)
  }
 
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("guildMemberAdd", async member => {
        var sayac = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/otorol.json", "utf8"));
  var otorole =  JSON.parse(fs.readFileSync("./ayarlar/jsonlar/otorol.json", "utf8"));
      var arole = otorole[member.guild.id].sayi
  var giriscikis = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/otorol.json", "utf8"));  
  var embed = new Discord.RichEmbed()
    .setTitle('Système Autorol')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag} une autorisation `)
.setColor("RANDOM")
    .setFooter(" ", bot.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    var giriscikiskanalID = giriscikis[member.guild.id].kanal;
    var giriscikiskanali = bot.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

bot.on("guildMemberAdd", async (member) => {
      var autorole =  JSON.parse(fs.readFileSync("./ayarlar/jsonlar/otorol.json", "utf8"));
      var role = autorole[member.guild.id].sayi

      member.addRole(role)

});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const invites = {};
const wait = require('util').promisify(setTimeout);

bot.on('ready', () => {
  wait(1000);

bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
bot.on('guildMemberAdd', member => {
let davetlog = JSON.parse(fs.readFileSync('./ayarlar/davetlog.json', 'utf8'));
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.get(invite.inviter.id);
const embed = new Discord.RichEmbed()
.setDescription(`${member.user.username} Sunucusuya katıldı! \n Davet Eden Kişi: \n<@${inviter.id}> \n Daveti Kullanan Kişi Sayısı:\n \`\`${invite.uses}\`\` \n Katıldığı Davet Kodu: \n**${invite.code}** \n Davet Linki: \n https://discord.gg/${invite.code}`)
.setColor("RED")
.setThumbnail(member.user.avatarURL)

  member.guild.channels.find("id", davetlog[member.guild.id]).send({
    embed
  });
  })
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



bot.on("message", async message => {   
  
let linkEngel = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/linkEngelle.json", "utf8"));
if (!linkEngel[message.guild.id]) return;
if (linkEngel[message.guild.id].linkEngel === "kapali") return;
    if (linkEngel[message.guild.id].linkEngel === "acik") {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(message.content)== true) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    if(!message.member.roles.some(role => role.name === 'EQUIPE! 👥')) {
      message.delete()
       message.channel.send(`<@${message.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("🛑 Link Engeli!")
        .addField("Reklam Yapmaya çalisan", message.author, true)
        .setDescription(`Bu sunucuda linkler **${message.guild.owner}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        message.channel.send(e);
    }
}
    }
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


bot.on(`ready`, async () => {
  wait(1000);
  
/*  let guild = client.guilds.get(`706658005512618037`)
let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "online").size;
let onnl = `Total des membres: ${guild.members.size}\nMembre actif: ${online}`

setInterval(() => {
client.channels.get(`706922656020168814`).setTopic(`${onnl.replace(`1`, ` 1 `).replace(/2/, `2`).replace(`3`, `3`).replace(/4/, `4`).replace(`5`, `5`).replace(/6/, `6`).replace(`7`, `7`).replace(/8/, `8`).replace(`9`, `9`).replace(/0/, `0`)}`) 
}, 3000);
*/
  
  let myGuild = bot.guilds.get("780119216954802197");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("780502793755557888");
  memberCountChannel.setName("👥 Üyeler : " + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
  
  let guild = bot.guilds.get("780119216954802197");
  let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "online").size;
  guild.channels.get("780502776869814312").setName("🟢 Çevrimiçi : " + online)
  //.then(result => console.log(result))
  .catch(error => console.log(error));


bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

bot.on('guildMemberAdd', member => {
  let myGuild = bot.guilds.get("780119216954802197");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("780502793755557888");
  memberCountChannel.setName("👥 Üyeler : " + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
  
  let guild = bot.guilds.get("780119216954802197");
  let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "online").size;
  guild.channels.get("780502776869814312").setName("🟢 Çevrimiçi : " + online)
  //.then(result => console.log(result))
  .catch(error => console.log(error));

})

bot.on("message", async msg => {
let myGuild = bot.guilds.get("780119216954802197");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("780502793755557888");
  memberCountChannel.setName("👥 Üyeler : " + memberCount)
  //.then(result => console.log(result))
  .catch(error => console.log(error));

  let guild = bot.guilds.get("780119216954802197");
  let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "online").size;
  guild.channels.get("780502776869814312").setName("🟢 Çevrimiçi : " + online)
  //.then(result => console.log(result))
  .catch(error => console.log(error));

})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const onay = require("../otoreact/onay.json");

var load = require("../otoreact/src/load");
load(bot, onay);

var track = require("../otoreact/src/track");
track(bot, onay);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on(`ready`, async () => {

let guild = client.guilds.get(`780119216954802197`) // kanalın bulunduğu sunucu id
let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;
let onnl = `Toplam Üye: ${guild.members.size}\nAktif Üye: ${online}`

setInterval(() => {
client.channels.get(`780119217402937396`).setTopic(`${onnl.replace(`1`, ` :one: `).replace(/2/, ` :two: `).replace(`3`, ` :three: `).replace(/4/, ` :four: `).replace(`5`, ` :five: `).replace(/6/, ` :six: `).replace(`7`, ` :seven: `).replace(/8/, ` :eight: `).replace(`9`, ` :nine: `).replace(/0/, ` :zero: `)}`) 
}, 3000);  })

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on("guildMemberAdd", member => {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Hoşgeldin')
.setDescription('MESAJ')
member.send(embed)
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Susturuldu");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

bot.login(ayarlar.token);