import { Client, Message } from 'discord.js'

function execute(bot: Client, message: Message, args: string[]) {
  message.reply('pong!')
}

export default {
  execute,
  info: {
    name: 'ping',
    aliases: ['пинг']
  }
}
