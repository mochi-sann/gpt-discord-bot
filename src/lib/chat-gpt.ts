import { ChatGPTAPI } from "chatgpt";

import { Config } from "./config/config.js";

export async function ChatGptSendMessage(chat: string): Promise<string> {
  // sessionToken is required; see below for details
  const api = new ChatGPTAPI({ sessionToken: Config.chatGpt.token });

  // ensure the API is properly authenticated
  await api.ensureAuth();

  // send a message and wait for the response
  const response = await api.sendMessage(chat);

  // response is a markdown-formatted string
  console.log(response);
  return response;
}
