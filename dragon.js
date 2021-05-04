const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

client.commands= new Discord.Collection(); // komutları alıyoruz

const prefix = "!"

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity('!prefix')
    console.log('Voavvvv!')
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return message.channel.send(`**${command}** adlı bir komur yok .`);


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.on('guildCreate', async guild => {
    const embed1 = new Discord.MessageEmbed()
    .setTitle('Sucunuza Eklediğiniz İçin Teşekkürler!')
    .setDescription('Sunucu Adı: `' + guild.name + '`')
    const embed2 = new Discord.MessageEmbed()
    .setTitle('Yeni Sunucu')
    .setDescription('Sunucu Adı: ' + guild.name)
    .addField('Kişi Sayısı:', guild.memberCount)
    .addField('Sunucu Sahibi:', guild.owner)
    .setThumbnail(guild.iconURL())
    guild.owner.send(embed1)
    const channel = client.channels.cache.find(ch => ch.id === '827645148477128714')
    channel.send(embed2)
})

client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.content === '!ayrıl') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.leave();
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });

client.login('ODM4MTQ3MzIyNTE2MzQwNzQy.YI23hQ.wYVfz8-VjYkB8uWTxIHhXSVR1TQ')