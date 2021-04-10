import { Message } from 'discord.js'
import { ClientWrapper } from '../ClientWrapper'
import { FunpicService } from '../services/funpic.service'

async function execute(bot: ClientWrapper, message: Message, args: string[]) {
  const mentionUser = message.mentions.users.first() || message.author
  const avatar = mentionUser.displayAvatarURL({
    format: 'png',
    size: 512
  })
  message.channel.startTyping()
  const result = await FunpicService.getByName('flashbacks', avatar)
  if (!result) {
    await message.channel.stopTyping()
    return message.channel.send('Упсс.. произошла какая то ошибка 😔')
  }
  await message.channel.send({
    files: [
      {
        attachment: Buffer.from(result),
        name: `${message.author.id}-flashbacks.jpg`
      }
    ]
  })
  await message.channel.stopTyping()
}

export default {
  execute,
  info: {
    name: 'flashbacks',
    aliases: ['флешбек', 'fb', 'flashback', 'флешбеки']
  }
}
