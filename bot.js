const Discord = require("discord.js");
const client = new Discord.Client();

client.login("NzM0NDkwMTA2NTYzNjU3ODA4.XxSdPg.OQrPZ6WJutGwc8AJWwlmCJ2SciU");

let ID='733628966665191546';                                   //Guild id axios:733628966665191546 ; guild id cirius:734492621950419025

console.log("Starting");
let prefix="X!";
console.log(ID);
client.on("message", (message) => {
if(message.content.toUpperCase().startsWith(prefix)){                                                //check for prefix
       console.log(message.content);
       const args = message.content.slice(prefix.length).trim().split(' ');                          //remove prefix and make array of rest words in message
       let input = args[0];
       if(input.toLowerCase()=="send"){
           len=args.length;
           const chnl = client.guilds.cache.get(ID).channels.cache.find(channel => channel.name === args[1].toLowerCase()+"-2020")
           post=args.slice(2,len+1).join(" ");
           chnl.send(post+"\n[<@"+message.member.user.id+"> from <#"+message.channel.id+">]");
           message.channel.send("Sent!");
	   }
       if(input.toLowerCase()=="list"){
           const listchannel = []
           client.guilds.cache.get(ID).channels.cache.forEach(channel => listchannel.push(channel.name));
           len=listchannel.length;
           message.channel.send("These are the channels on the server:\n*"+listchannel.slice(3,len+1).join('\n*'));
           }
       if(input.toLowerCase()=="help"){
           message.channel.send("Every command must be started with :point_right: **X!** :point_left:.\nThese commands can be used:")
           message.channel.send("```bash\n'X! send channel_name message'\n```   =>This command can be used to send message to the channel which you are not currently part of.**For Ex:X! send web-dev your_text**.\nChannels in which you can send message with this: competitive-programming, android-development ,cyber-security ,design ,machine-learning ,web-dev ,team-eduthon")
           message.channel.send("```bash\n'X! help'\n```   =>To open this help dialog")
           }    
}

if(message.guild == null && message.content.toUpperCase().startsWith(prefix)) {                                              //Check if it is private message and check for prefix
const args = message.content.slice(prefix.length).trim().split(' ');                                           //extract words from the sentence provided
console.log(message.content);
let input = args[0];
if(input.toLowerCase() == "cname"){  										             //check whether to change the name 
    change=args[1];
    client.guilds.cache.get(ID).members.cache.get(message.author.id).setNickname(change);
    message.author.send("Which Batch you belong to:(Ex X! year 2019)");
    }
if ( input.toLowerCase() == "year"){                                                                                         //check for year             
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
member.send("Tell me your First name after writing X! cname \n(Ex:X! cname your_name)");
});
