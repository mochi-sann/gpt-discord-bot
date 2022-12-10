import { ChatInputCommandInteraction, PermissionsString } from "discord.js";
import { RateLimiter } from "discord.js-rate-limiter";
import { ChatGptSendMessage } from "../../lib/chat-gpt.js";

import { Language } from "../../models/enum-helpers/index.js";
import { EventData } from "../../models/internal-models.js";
import { Lang } from "../../services/index.js";
import { InteractionUtils } from "../../utils/index.js";
import { Command, CommandDeferType } from "../index.js";

export class GptCommand implements Command {
  public names = [Lang.getRef("chatCommands.gpt", Language.Default)];
  public cooldown = new RateLimiter(1, 5000);
  public deferType = CommandDeferType.PUBLIC;
  public requireClientPerms: PermissionsString[] = [];

  public async execute(
    intr: ChatInputCommandInteraction,
    data: EventData
  ): Promise<void> {
    let args = {
      option: intr.options.getString(
        Lang.getRef("arguments.text", Language.Default)
      ),
    };
    console.log(args);
    const response = await ChatGptSendMessage(args.option);
    await InteractionUtils.send(
      intr,
      `# text
  ${args.option}

  # 返答 
  ${response}`
    );
  }
}
