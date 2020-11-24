const Discord = require('discord.js')
const fs = require("fs");
const client = new Discord.Client();

const ayarlar = require('./ayarlar/ayarlar.json');

const ParisDekiBebeğ = require("./jsler/ParisdekiBebeg.js");
//const YoutubeRadio = require("./jsler/radio.youtube.js");
//----------------------------------------------------------//

client.on('ready', function () {
  client.user.setGame("p!help")
  console.log("Hazirim")
})

//----------------------------------------------------------//

client.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./ayarlar/jsonlar/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
  
  
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return;

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix; 
  
  //--Admin Ve Moderatörler
  try {
	let AdminKomut = require(`./adminXmod/${cmd}.js`);
	AdminKomut.run(client, message, args);
    
	if(!AdminKomut) return message.channel.send("Tritax AI Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    //console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  }
  //--Komutlar
  try {
	let Komutlar = require(`./komutlar/${cmd}.js`);
	Komutlar.run(client, message, args);
    
	if(!Komutlar) return message.channel.send("Tritax AI Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    //console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  }
  
  //--------------------------------------------------------------------------------------------------------------------------------------------------------//

})

//----------------------------------------------------------//


client.login(ayarlar.token);
