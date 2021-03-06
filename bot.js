const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('I am ready!');
});

client.login('Mjg2MTUyNjU0MjQ0MjgyMzY4.DRAHbg.UlGBTHbdbVQEsXy2S0P0MQlIYAo');
client.on('ready', () => {
  client.user.setGame('!commands')
})
client.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});
client.on("guildCreate", guild => {
  // This event triggers when the client joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
client.on("guildDelete", guild => {
  // this event triggers when the client is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other clients. This also makes your client ignore itself
  // and not get into a spam loop (we call that "clientception").
  if(message.author.client) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "!ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the client and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Your Ping : ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  
  if(command === "!say") {
    // makes the client say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the client to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "!kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Admin", "Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "!purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});
client.on('message', message => {
  if (message.content === '!nope') {
    message.reply('Miss Me With That Gay Shit');
  }
});
client.on('message', message => {
  if (message.content === '!commands') {
  message.reply('**This is the commands in this bot** \n ``` !commands \n !help \n !invite \n !nigger \n !nope \n !minecraft \n !donate \n ,,play ```');
  }
});
client.on('message', message => {
  if (message.content === '!nigger') {
  message.reply('@everyone niggers');
  }
});
client.on('message', message => {
  if (message.content === '!invite') {
  message.reply('https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=385932694523215872&scope=client&permissions=0');
  }
});
client.on('message', message => {
  if (message.content === '!help') {
  message.reply('retarded faggot');
  }
});
client.on('message', message => {
  if (message.content === '!minecraft') {
  message.reply('A game full of autistic kids who cheats and  says Mr3MS!');
  }
});
client.on('message', message => {
  if (message.content === '!donate') {
  message.reply('i poor pls donate for good shit :  ');
  }
});
client.on('message', message => {
  if (message.content === '!ping') {
  message.reply(`Your Ping : ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
