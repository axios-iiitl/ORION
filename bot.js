const Discord = require("discord.js");
const MongoClient = require('mongodb').MongoClient;

const client = new Discord.Client();

client.login("NzM0NDkwMTA2NTYzNjU3ODA4.XxSdPg.OQrPZ6WJutGwc8AJWwlmCJ2SciU");

let ID='733628966665191546';                                   //Guild id axios:733628966665191546 ; guild id cirius:734492621950419025

console.log("Starting");
let prefix="X!";
console.log(ID);
client.on("message", async message => {
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
           message.channel.send("```bash\n'X! set name github_userID twitter_username codeforces_username codechef_username'\n```    =>This command sets your information in the database.If you don't have a username for a site then use **NA** at that place.**Github Username is must**")
           message.channel.send("```bash\n'X! update website_name new_website_username'\n```    => This command modifies the existing values in the database.\nFor Ex: To change username of twitter \nX! update twitter new_twitter_username")
           message.channel.send("```bash\n'X! info @username'\n```    => This will give the information about the member.")
           message.channel.send("```bash\n'X! help'\n```   =>To open this help dialog")
           }
       if(input.toLowerCase()=="update"){                                                                   //ALL About UPDATE
           if(args[1].toLowerCase()=="github"){
            await database(message,'github',message.author.tag.split('#')[1],args[2]);
            }
          else if(args[1].toLowerCase()=="twitter"){
            await database(message,'twitter',message.author.tag.split('#')[1],args[2]);
            }
          else if(args[1].toLowerCase()=="codechef"){
            await database(message,'codechef',message.author.tag.split('#')[1],args[2]);
            }
          else if(args[1].toLowerCase()=="codeforces"){
            await database(message,'codeforces',message.author.tag.split('#')[1],args[2]);
            }    
          else {
            message.channel.send("SYNTAX ERROR!\n Please specify the information you want to modify.\n Ex: **X! update twitter new_twitter_username**")
            }
         }
       if(input.toLowerCase()=="set"){  
          console.log("Reached Inside");                                                                   //Insert Info in database
          if(args[1] == null){
            message.channel.send("SYNTAX ERROR!");
           }
          //else if( args[1] != message.author.tag.split('#')[1]) { 
          //  message.channel.send("Wrong ID");
          // }
          else{
            await database(message,"set",args[1],args[2],args[3],args[4],args[5],message.author.tag.split('#')[1]); 
           } 
        }
       if(input.toLowerCase()=="info"){
          UserID = args[1].split('@!')[1].slice(0,-1);
          console.log(UserID);
          user=client.guilds.cache.get(ID).members.cache.get(UserID);
          DID=user.user.discriminator;
          console.log(DID);
          await database(message,"info",DID)            
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

async function database(message,query1='NULL',query2='NULL',query3='NULL',query4='NULL',query5='NULL',query6='NULL',query7='NULL'){

    const uri = "mongodb+srv://Axios:ViHlW5EI1PXZYH4z@cluster0.hrcl9.mongodb.net/admin?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
        // Make the appropriate DB calls
        const db = await client.db('Axios_Data');
        const collection = await db.collection('Members_Data');
        if(query1=='set'){
             console.log(query1,query2,query3,query4,query5,query6,query7);           
             await collection.insertOne({name: query2,github_username: query3,twitter_username: query4, codechef_username: query5, codeforces_username: query6, DID: query7}); 
             message.channel.send("Added!");
             //await listDatabases(client);
          } 
        if(query1=="github"){
            await collection.updateOne({DID: query2 }, {'$set': {'github_username': query3}});
            message.channel.send("Updated!");
          }
        if(query1=='twitter'){
            await collection.updateOne({DID: query2 }, {'$set': {'twitter_username': query3}});
            message.channel.send("Updated!");            
          }
        if(query1=='codechef'){
            await collection.updateOne({DID: query2 }, {'$set': {'codechef_username': query3}});
            message.channel.send("Updated!");           
          }        
        if(query1=='codeforces'){
            await collection.updateOne({DID: query2 }, {'$set': {'codeforces_username': query3}});
            message.channel.send("Updated!");
          }
        if(query1=='info'){  
            items=await collection.find({DID: query2}).toArray()
            let name=items[0].name;
            let github=items[0].github_username;
            let twitter=items[0].twitter_username;
            let codechef=items[0].codechef_username;
            let codeforces=items[0].codeforces_username;
            message.channel.send("Name: "+name+"\nGithub Username: "+github+"\nTwitter Username: "+twitter+"\nCodechef Username: "+codechef+"\nCodeforces Username: "+codeforces);
          }  
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
