I need help fixing ./createBusiness.js it has the current code i tried and here is the error 

```console
DiscordAPIError[50035]: Invalid Form Body
name[BASE_TYPE_REQUIRED]: This field is required
    at handleErrors (E:\BOTS\GolliBot\node_modules\discord.js\node_modules\@discordjs\rest\dist\index.js:687:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async SequentialHandler.runRequest (E:\BOTS\GolliBot\node_modules\discord.js\node_modules\@discordjs\rest\dist\index.js:1072:23)
    at async SequentialHandler.queueRequest (E:\BOTS\GolliBot\node_modules\discord.js\node_modules\@discordjs\rest\dist\index.js:913:14)
    at async _REST.request (E:\BOTS\GolliBot\node_modules\discord.js\node_modules\@discordjs\rest\dist\index.js:1218:22)
    at async GuildChannelManager.create (E:\BOTS\GolliBot\node_modules\discord.js\src\managers\GuildChannelManager.js:170:18)       
    at async Object.handleCreateBusinessCommand [as execute] (E:\BOTS\GolliBot\commands\Moderation-Discord\create-business.js:58:33)
    at async Object.execute (E:\BOTS\GolliBot\events\interactionCreate.js:16:4) {
  requestBody: {
    files: undefined,
    json: {
      name: undefined,
      topic: undefined,
      type: undefined,
      nsfw: undefined,
      bitrate: undefined,
      user_limit: undefined,
      parent_id: undefined,
      position: undefined,
      permission_overwrites: undefined,
      rate_limit_per_user: undefined,
      rtc_region: undefined,
      video_quality_mode: undefined,
      available_tags: undefined,
      default_reaction_emoji: undefined,
      default_auto_archive_duration: undefined,
      default_sort_order: undefined,
      default_forum_layout: undefined
    }
  },
  rawError: {
    message: 'Invalid Form Body',
    code: 50035,
    errors: { name: [Object] }
  },
  code: 50035,
  status: 400,
  method: 'POST',
  url: 'https://discord.com/api/v10/guilds/905917217223364638/channels'
}
```

i cant find a solution because all my research says it it is right but as you can see from above its not right. What i was going for is the bot to create the 2 channels and 1 role in the defined category and then send an embed message into the defined logChannel.
