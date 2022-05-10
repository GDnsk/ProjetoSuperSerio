const { Client, Intents } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer,createAudioResource } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");
const audioPathVacilao = '/home/guilherme/vacilobot/9ab7ebd0-2d49-11ec-a28e-0732c6e2361e.mp3';
const audioPath = '/home/guilherme/vacilobot/3dab7680-2d55-11ec-b279-218c1da8b05e.mp3';
let connection = null;
const player = createAudioPlayer();

async function play(path) {
    player.stop();
    const resource = createAudioResource(path);
    connection.subscribe(player);
    await player.play(resource);
}
// player.play(resource);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

addSpeechEvent(client, {
    lang:"pt-BR"
});

client.on("messageCreate", (msg) => {
  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
  }
});

client.on('message', msg => {
})

client.on("speech", (msg) => {
  console.log(msg.content);
  if(msg.content){
    var text = msg.content.toUpperCase();
    if (text.includes("DOUG") || text.includes("TESTE") || text.includes("VACILO") || text.includes("MANÉ") || text.includes("DOUGLAS")) {
      play(audioPathVacilao);
    }
    else if(text.includes("HOJE") || text.includes("OXI") || text.includes("UÉ") || text.includes("EITA") || text.includes("UAI") || text.includes("CARACA")){
      play(audioPath);
    }
  }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login("token");
