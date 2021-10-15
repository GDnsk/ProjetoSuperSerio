import { VoiceConnection } from "@discordjs/voice";
import { Client, User } from "discord.js";
import { SpeechOptions } from "../speechOptions";
import VoiceMessage from "../voiceMessage";
declare const _default: ({ client, bufferData, user, connection, speechOptions, }: {
    client: Client;
    bufferData: Uint8Array[];
    user: User;
    connection: VoiceConnection;
    speechOptions: SpeechOptions;
}) => Promise<VoiceMessage | undefined>;
export default _default;
