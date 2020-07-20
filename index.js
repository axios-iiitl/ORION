const Discord = require("discord.js");
const client = new Discord.Client();

client.login("NzM0NDkwMTA2NTYzNjU3ODA4.XxSdPg.OQrPZ6WJutGwc8AJWwlmCJ2SciU");

let ID='734492621950419025';
console.log(ID);
client.on("message", (message) => {
if(message.content == "Hello"){ 
                name=message.member.user.tag;
		message.channel.send("Hello "+name+":wave:");
		 
}
let prefix="new";
if(message.guild == null && message.content.startsWith(prefix)) {
const args = message.content.slice(prefix.length).trim().split(' ');
let name = args[0];
console.log(name);
if( name == "narendra" || name == "Narendra") {
        client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734507706626474094'); 	
}
if( name == "Charan" || name == "charan") {
        client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734507914630266890'); 	
}
}	
let {guild} = message;
console.log(guild ? `New message in ${guild.name}` : "New private message");
});

client.on("guildMemberAdd", (member) => {
let guild = member.guild; // Reading property `guild` of guildmember object.
let memberTag = member.user.tag; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
if(guild.systemChannel){ // Checking if it's not null
	guild.systemChannel.send(memberTag + " has joined!");
	}	
member.send("Hello there, please answer the Questions");
member.send("Tell me your First name after writeing new \n(Ex:new name)");
});
