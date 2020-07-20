const Discord = require("discord.js");
const client = new Discord.Client();

client.login("NzM0NDkwMTA2NTYzNjU3ODA4.XxSdPg.OQrPZ6WJutGwc8AJWwlmCJ2SciU");

let ID='733628966665191546';                                   //Guild id axios:733628966665191546 ; guild id cirius:734492621950419025

console.log(ID);
client.on("message", (message) => {
if(message.content == "Hello"){ 
                name=message.member.user.tag;
	        message.channel.send("Hello "+name+":wave:");
		console.log(message.guild.id);
		message.channel.send("GuildID sent");
		 
}
let prefix="X!";
if(message.guild == null && message.content.startsWith(prefix)) {                                              //get the private message and checck for prefix
const args = message.content.slice(prefix.length).trim().split(' ');                                           //extract words from the sentence provided
console.log(message.content);
let input = args[0];
if(input == "cname"){  										             //check whether to change the name 
    change=args[1];
    client.guilds.cache.get(ID).members.cache.get(message.author.id).setNickname(change);
    message.author.send("Which Batch you belong to:(Ex X! year 2019)");
    }
if ( input == "year"){                                                                                         //check for year             
    if( args[1] == "2019" ){
           client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734681077549105233');
           message.author.send("Role Assigned"); 	
    }
    else if( args[1] == "2018") {
        client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734681070506868736');
        message.author.send("Role Assigned"); 	
    }
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
member.send("Hello there, welcome to the Axios Server.\nPlease answer the questions to proceed.");
member.send("Tell me your First name after writing X! \n(Ex:X! cname your_name)");
});
