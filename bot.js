const Discord = require("discord.js");
const MongoClient = require('mongodb').MongoClient;
var schedule = require('node-schedule');
const axios = require('axios');

const client = new Discord.Client();

client.login("NzM0NDkwMTA2NTYzNjU3ODA4.XxSdPg.OQrPZ6WJutGwc8AJWwlmCJ2SciU");

let ID='733628966665191546';                                   //Guild id axios:733628966665191546 ; guild id cirius:734492621950419025

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("Starting");
let prefix="X!";
console.log(ID);
var timevar=0;
var channel,channelupdates;                                                                   //variable for leaderboard channel and hacktober-updates channel
client.on("ready", () =>{
    const z = schedule.scheduleJob({hour: 20, minute: 59}, () => {                            //Print leaderboard of codeforces's streak
          show();
        }); 
    console.log(`Logged in as ${client.user.tag}!`);                     
    client.user.setActivity("X! help", {                                                       //Set the status of the bot
    type: "LISTENING",
    url: "https://www.fake.tt/"
});
channel=client.guilds.cache.get(ID).channels.cache.get('742036006517342269');                  //These objects can be used correctly after initailization.
channelupdates=client.guilds.cache.get(ID).channels.cache.get('760539895478353991');           //which happens approximately after a second script gets started.
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////ALL THE COMMANDS OF BOT AVAILABLE INSIDE SERVER////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
if(message.content.toUpperCase().startsWith(prefix) && message.channel.type != "dm"){                                                //check for prefix
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
       else if(input.toLowerCase()=="list"){
           const listchannel = []
           client.guilds.cache.get(ID).channels.cache.forEach(channel => listchannel.push(channel.name));
           len=listchannel.length;
           message.channel.send(listchannel);
           //message.channel.send("These are the channels on the server:\n*"+listchannel.slice(3,len+1).join('\n*'));
           }
       else if(input.toLowerCase()=="help"){
           message.channel.send("Every command must be started with :point_right: **X!** :point_left:.\nThese commands can be used:")
           message.channel.send("```bash\n'X! send channel_name message'\n```   =>This command can be used to send message to the channel which you are not currently part of.**For Ex:X! send web-dev your_text**.\nChannels in which you can send message with this: competitive-programming, android-development ,cyber-security ,design ,machine-learning ,web-dev ,team-eduthon")
           message.channel.send("```bash\n'X! set gh:github_userID tw:twitter_username cf:codeforces_username cc:codechef_username'\n```    =>This command sets your information in the database.If you don't have a username for a site then use **NA** at that place.\nEx:X! set cf:NA tw:twitt gh:NA cc:code")
           message.channel.send("```bash\n'X! update website_name new_website_username'\n```    => This command modifies the existing values in the database.\nFor Ex: To change username of twitter \nX! update twitter new_twitter_username")
           message.channel.send("```bash\n'X! info @username'\n```    => This will give the information about the member.")
           message.channel.send("```bash\n'X! help'\n```   =>To open this help dialog\nThese commands are only usable within the server's channel.These would not work in private messages to bot.")
           }
       else if(input.toLowerCase()=="update"){                                                                   //ALL About UPDATE
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
       else if(input.toLowerCase()=="set"){  
          console.log("Reached Inside");                                                                   //Insert Info in database
          if(args[1] == null){
            message.channel.send("SYNTAX ERROR!");
           }
          //else if( args[1] != message.author.tag.split('#')[1]) { 
          //  message.channel.send("Wrong ID");
          // }
          else{
            if(!args[4]) {
              message.console.log("Syntax Error!");
              }
            let gh,tw,cc,cf = 'NA';
            for(i=1;i<=4;i++){                                                                               //for loop to sort values to be send
               if(args[i].split(':')[0] == "gh"){
                   gh=args[i].split(':')[1];
                   }
               else if(args[i].split(':')[0] == 'tw'){
                   tw=args[i].split(':')[1];
                   }
               else if(args[i].split(':')[0] == 'cf'){
                   cf=args[i].split(':')[1];
                   }
               else if(args[i].split(':')[0] == 'cc'){
                   cc=args[i].split(':')[1];
                   }
               }                       
            await database(message,"set",message.member.nickname,gh,tw,cf,cc,message.author.tag.split('#')[1]); 
         } 
        }
       else if(input.toLowerCase()=="info"){
          UserID = args[1].slice(-19,-1);
          console.log(UserID);
          user=client.guilds.cache.get(ID).members.cache.get(UserID);
          DID=user.user.discriminator;
          console.log(DID);
          await database(message,"info",DID)            
        }
       else{
        message.channel.send("Couldn't find that command!:confused:");
        } 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////COMMAND WORKING IN DM AND FOR NEW USERS////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(message.guild == null && message.content.toUpperCase().startsWith(prefix)) {                                              //Check if it is private message and check for prefix
const args = message.content.slice(prefix.length).trim().split(' ');                                           //extract words from the sentence provided
console.log(message.content);
let input = args[0];
if(input.toLowerCase() == "cname"){  										             //check whether to change the name 
    change=args[1];
    client.guilds.cache.get(ID).members.cache.get(message.author.id).setNickname(change);
    message.author.send("Which Batch you belong to:(Ex X! year 2019)");
    }
else if ( input.toLowerCase() == "year"){                                                                                         //check for year             
    if( args[1] == "2019" ){
           client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734681077549105233');
           message.author.send("Role Assigned"); 	
    }
    else if( args[1] == "2018") {
        client.guilds.cache.get(ID).members.cache.get(message.author.id).roles.add('734681070506868736');
        message.author.send("Role Assigned"); 	
    }
    message.author.send("Please give some information about you.Ex: ***X! set gh:github_userID tw:twitter_username cf:codeforces_username cc:codechef_username*** \n If you don't have account on a website, then use NA at that place.\nFor Ex: if you don't have twitter account then your input would look like\n`X! set gh:your_github_username tw:NA cf:codeforces_username cc:codechef_username`");
}
else if (input.toLowerCase() == "set") {
    if(!args[4]){
        message.channel.send("Syntax Error");
        }
    let gh,tw,cc,cf = 'NA';
    for(i=1;i<=4;i++){                                                                               //for loop to sort values to be send
       if(args[i].split(':')[0] == "gh"){
               gh=args[i].split(':')[1];
               }
       else if(args[i].split(':')[0] == 'tw'){
               tw=args[i].split(':')[1];
               }
       else if(args[i].split(':')[0] == 'cf'){
               cf=args[i].split(':')[1];
               }
       else if(args[i].split(':')[0] == 'cc'){
               cc=args[i].split(':')[1];
               }
       }       
    await database(message,"set",client.guilds.cache.get(ID).members.cache.get(message.author.id).nickname,gh,tw,cf,cc,message.author.tag.split('#')[1]);
    message.author.send("You are all done.Hop on to the Server and visit the info channel for all the information and rules of the server.");
    }
else{
    message.author.send("SYNTAX ERROR! or You might have run command which is not available with dm.");
    }     
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////CHECKS FOR NEW USERS AND SENDS A MESSAGE TO NEW USERS////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////DATABASE RELATED THINGS///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////EDIT WITH CAUTION//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function database(message,query1='NULL',query2='NULL',query3='NULL',query4='NULL',query5='NULL',query6='NULL',query7='NULL'){

    const uri = "mongodb+srv://Axios:ViHlW5EI1PXZYH4z@cluster0.hrcl9.mongodb.net/admin?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
    try {
        // Connect to the MongoDB cluster
        await client.connect(); 
        // Make the appropriate DB calls
        const db = await client.db('Axios_Data');
        const collection = await db.collection('Members_Data');
        if(query1=='set'){                                                                       ////Update Database with the values provided by the user
             console.log(query1,query2,query3,query4,query5,query6,query7);
             if(!(await collection.findOne({DID: query7}))){ 
               await collection.insertOne({name: query2,github_username: query3,twitter_username: query4, codeforces_username: query5, codechef_username: query6, DID: query7}); 
               message.channel.send("Added!");
               //await listDatabases(client);
               }
             else{
               message.channel.send("User's Data already in Database\nUse update command to update the values");
               }  
          }       
        if(query1=="github"){                                                                                  //update github handle
            await collection.updateOne({DID: query2 }, {'$set': {'github_username': query3}});
            message.channel.send("Updated!");
          }
        if(query1=='twitter'){                                                           			    //update twitter handle
            await collection.updateOne({DID: query2 }, {'$set': {'twitter_username': query3}});
            message.channel.send("Updated!");            
          }
        if(query1=='codechef'){                                                                               //update codechef 
            await collection.updateOne({DID: query2 }, {'$set': {'codechef_username': query3}});
            message.channel.send("Updated!");           
          }        
        if(query1=='codeforces'){                                                                             //update codeforces handle
            await collection.updateOne({DID: query2 }, {'$set': {'codeforces_username': query3}});
            message.channel.send("Updated!");
          }
        if(query1=='info'){                                                                                  //Fetch the info
            items=await collection.find({DID: query2}).toArray() 
            if(Array.isArray(items) && items.length ){                                                       //Check whether user's info has been fetched.    
            let name=items[0].name;
            let github=items[0].github_username.replace(/_/g,'\\_');                                        //escaping text formating characters
            let twitter=items[0].twitter_username.replace(/_/g,'\\_');
            let codechef=items[0].codechef_username.replace(/_/g,'\\_');
            let codeforces=items[0].codeforces_username.replace(/_/g,'\\_');
            message.channel.send("Name: "+name);
            if(github != 'NA' && github != 'N/A' && github != 'NULL')
              message.channel.send("GitHub Username: "+github);
            if(twitter != 'NA' && twitter != 'N/A' && twitter != 'NULL')
              message.channel.send("Twitter Username: "+twitter);
            if(codechef != 'NA' && codechef != 'N/A' && codechef != 'NULL')
              message.channel.send("Codechef Username: "+codechef);
            if(codeforces != 'NA' && codeforces != 'N/A' && codeforces != 'NULL')      
              message.channel.send("Codeforces Username: "+codeforces);
            }
            else{                                                                               
                message.channel.send("User's info not in the Database");
            }
          }
        if(query1=='leaderboard'){
            const collection2 = await db.collection('leaderboard');
            let data = await collection2.findOne({imp: "1"});
            let CID=data.contest;            
            let URL="https://codeforces.com/api/contest.list";
            const newID = await getdata("check",URL,"null",CID);
            if( newID && newID.length ){
                 console.log(newID);
                 let abcd=await collection.find().toArray();
                 console.log( abcd[0].twitter_username);
                 for (a in abcd)  {
                      handle=abcd[a].codeforces_username;
                      if(handle === "NA" || handle === "NULL"){
                            console.log("No handle");
                            continue;
                         }
                      DiscordID=abcd[a].DID;                         
                      let URL="https://codeforces.com/api/user.rating?handle="+handle
                      console.log(URL);
                      for ( m in newID ){
                      let retvalue = await getdata("extract",URL,handle,newID[m])
                      console.log(retvalue);
                      if(retvalue == "increase"){
                               if(!(await collection2.findOne({DID: DiscordID}))){
                                    await collection2.insertOne({DID: DiscordID, streak:1,name: abcd[a].name, cfhandle: handle});
                                    }
                               else {
                                    console.log("changing");
                                    let dat = await collection2.findOne({DID: DiscordID});
                                    let streak=dat.streak;
                                    await collection2.updateOne({DID: DiscordID}, {'$set': { 'streak' : streak+1 }});
                                    }
                                }
                      else if(retvalue == "decrease"){
                                if((await collection2.findOne({DID: DiscordID}))){
                                  await  collection2.updateOne({DID: DiscordID}, {'$set': { 'streak' : 0 }});
                                  }
                                }                   
                    }
                    await collection2.updateOne({imp: "1"},{ '$set' : { 'contest' : newID[m] }});
                  }               
              }
         }
         if(query1=='show'){
			if(query2=='cf'){ 
            console.log(ID);
            const collection3 = await db.collection('leaderboard');
            var desc= { streak : -1};                                                   //For making the data fetched from database to get sorted in descending order.
            let pr=await collection3.find().sort(desc).toArray();
            channel.send(":trophy:  **LEADERBOARD**  <:dir:734777015743545344>\n`Rank   Streak   Name`");
            for (b in pr){
                  console.log(typeof b);
                  rank=parseInt(b,10)+1;
                  if((typeof pr[b].streak) != 'undefined'){
                        if(rank==11){
                             break;
                             }
                        if(rank==1){
                             if(pr[b].streak == 0){                  
                               channel.send("`\u200b "+rank+"       "+pr[b].streak+"      "+pr[b].name+":"+pr[b].cfhandle+"`<:emoji_2:734775209399418970>")
                             }
                             else{
                               channel.send("`\u200b "+rank+"       "+pr[b].streak+"      "+pr[b].name+":"+pr[b].cfhandle+"`:crown:");
                             }
                        }
                        else{
                             channel.send("`\u200b "+rank+"       "+pr[b].streak+"      "+pr[b].name+":"+pr[b].cfhandle+"`");
                        }
                  }
                }
            }
            else if(query2=='hacktober'){
			    const collection4 = await db.collection('hacktober');
			    var desc= { pulls : -1};
			    let pr1=await collection4.find().sort(desc).toArray();
			    channel.send(":trophy:  **HACKTOBER LEADERBOARD**  <:dir:734777015743545344>\n`Rank   Pulls   Name`");
			    for (b in pr1){
                  console.log(typeof b);
                  rank=parseInt(b,10)+1;
                  if((typeof pr1[b].pulls) != 'undefined'){
                        if(rank==11){
                             break;
                             }
                        if(rank==1){
                             if(pr1[b].pulls == 0){                      //Check if the user is on top of leaderboard with 0 pulls
                               channel.send("`\u200b "+rank+"       "+pr1[b].pulls+"      "+pr1[b].name+":"+pr1[b].github_handle+"`<:emoji_2:734775209399418970>");    
                             }
                             else{
                               channel.send("`\u200b "+rank+"       "+pr1[b].pulls+"      "+pr1[b].name+":"+pr1[b].github_handle+"`:crown:");
                             }
                        }
                        else{
                             channel.send("`\u200b "+rank+"       "+pr1[b].pulls+"      "+pr1[b].name+":"+pr1[b].github_handle+"`");
                        }
                  }
                }
			    
			}   
		  }                   
         if(query1=='hacktober'){                                                           //hacktober leaderboard
            var collection5= await db.collection('hacktober');
                 let abcd=await collection.find().toArray();
                 console.log( abcd[0].github_username);
                 for (a in abcd)  {
                      handle=abcd[a].github_username;
                      if(handle === "NA" || handle === "NULL"){
                            console.log("No handle");
                            continue;
                         }
                      var DiscordID=abcd[a].DID;    
                      Name=abcd[a].name;
                      console.log(DiscordID);                     
                      let URL="https://api.github.com/users/"+handle+"/events"
                      console.log(URL);
                      var m;
                      let retvalue = await githubdata("extract",URL,handle)
                      //console.log(retvalue);
                      if(retvalue){
                               let streak=0;
                               let last="NA";
                               var fetched=await collection5.find({ DID: DiscordID }).toArray();
                               console.log(typeof fetched);
                               if(!(fetched && fetched.length)){
                                        console.log("Account not in database");
                                        let repo,name;
                                        let flag=0;
                                        for (b in retvalue) {
                                              if(retvalue[b].created_at.split('-')[1] == '10'){
                                                    if(retvalue[b].type == 'PullRequestEvent'){ 
                                                        streak++;
                                                        if(flag == 0){console.log(streak); flag++;last=retvalue[b].id;}                                          //For storing the value of last variable.
                                                        repoapi = retvalue[b].payload.pull_request.url;
                                                        name = retvalue[b].payload.pull_request.title;
                                                        repo=repoapi.replace("api.","").replace("/repos","");
                                                        channelupdates.send(handle+" made a pull request **"+name+"** at "+repo);   
                                                    }    
                                              }
                                              else { 
                                                   break;
                                                }
                                        }     
                                        collection5.insertOne({ DID: DiscordID, github_handle: handle, lastchange: last,pulls: streak,name: Name});
                                     }   
                              else{
                                       console.log("Account in database");
                                       last=fetched[0].lastchange;
                                       streak=fetched[0].pulls;
                                       console.log(last);
                                       for (b in retvalue){
                                               if(retvalue[b].created_at.split('-')[1] == '10'){
                                                         if(retvalue[b].type == 'PullRequestEvent'){
                                                              if(retvalue[b].id != last){
                                                                streak++;
                                                                if(flag == 0){console.log(streak); flag++;last=retvalue[b].id;}
                                                                repo = retvalue[b].payload.pull_request.url;
                                                                name = retvalue[b].payload.pull_request.title;
                                                                channel.send(handle+" made a pull request **"+name+"** at "+repo); 
                                                                }
                                                              else{
                                                                break;
                                                                }
                                                         }
                                                }           
                                                else{
                                                    break;
                                                }
                                         }                                                
                                      collection5.updateOne({ DID:DiscordID },{'$set' : { pulls: streak, lastchange: last }});                          
                             }        
                      }  
                       //break;      
                 }
                 }          
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////DATABASE FUNCTION ENDS////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const j = schedule.scheduleJob({hour: 20, minute: 30}, () => {                                        //Update data in leaderboard
     database("null","leaderboard");
});

setInterval(database,300000,"null","hacktober");

async function show(){
	database("null","show","cf");
	await new Promise(resolve => setTimeout(resolve, 120000));                                        //Wait 2 min
    database("null","show","hacktober");
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////Things Related to using API and stuff to retrieve data from websites//////////////////////////////////////////////////////////////////


async function getdata(process,url,handle="null",ID="null"){
       if(process=='extract'){
        try {
              const response = await axios.get(url)
              let extract=response.data.result;
              let a;
              for (a in extract){
                 // console.log(extract[a].oldRating);
               }
              console.log(extract[a].id,handle);   
              if(extract[a].contestId == ID){
                   console.log(extract[a].oldRating);
                   console.log(extract[a].newRating);
                   if(extract[a].oldRating > extract[a].newRating){return "decrease";}
                   else {return "increase";}      
                 }
              else{
                  return "nochange";
                  }              
         } catch (error) {
         console.log("ERROR1");
         }
        }
       if(process=='check'){
        try { 
              console.log("Tst");
              console.log(url);
              const response = await axios.get(url)
              let extract=response.data.result;
              IDS= [];
              for(var n=0; n<=25 ;n++){
              if(extract[n].phase == "FINISHED"){
                  if(extract[n].id == ID){
                          break;
                          }
                  else{
                          IDS.push(extract[n].id);     
                   }          
                  }
              }
              return IDS;
            } catch (error){
            console.log(error.response.status);
            }
       }
                  
}  

async function githubdata(process,url,handle="null"){
       if(process=='extract'){
        try {
              const config = { 
                    method: 'get',
                    url: url,
                    headers: { 'Authorization' : 'token 7bf537e0e7a8f2f104dcf782a8b90810cb42d5ba' } 
                    }
              
              let response = await axios(config)
              let extract=response.data;
              let a;
              console.log(extract['0'].created_at.split('-')[1]);
              return extract;                  
         } catch (error) {
         console.log("ERROR1");
         }
       }            
} 
//async function listDatabases(client){
//    databasesList = await client.db().admin().listDatabases();
// 
//    console.log("Databases:");
//    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//};
