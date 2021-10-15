"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
/**
 * It's a bit hacky solution to check if speech handler has been already attached to connection receiver
 * It does it by checking if in the listeners of speaking map exists function with the same name as function
 * which handles speech event
 * @param connection
 * @returns
 */
const isSpeechHandlerAttachedToConnection = (connection) => {
    return Boolean(connection.receiver.speaking
        .listeners("start")
        .find((func) => func.name === "handleSpeechEventOnConnectionReceiver"));
};
exports.default = (client, speechOptions) => {
    client.on("voiceStateUpdate", (_old, newVoiceState) => {
        if (!newVoiceState.channel)
            return;
        const connection = (0, voice_1.getVoiceConnection)(newVoiceState.channel.guild.id, speechOptions.group);
        if (connection && !isSpeechHandlerAttachedToConnection(connection))
            client.emit("voiceJoin", (0, voice_1.getVoiceConnection)(newVoiceState.channel.guild.id, speechOptions.group));
    });
};
//# sourceMappingURL=voiceJoin.js.map