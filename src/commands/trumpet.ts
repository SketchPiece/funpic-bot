import { Message } from 'discord.js'
import { ClientWrapper } from '../ClientWrapper'
import { FunpicService } from '../services/funpic.service'

async function execute(bot: ClientWrapper, message: Message, args: string[]) {
  const mentionUser = message.mentions.users.first()
  if (!mentionUser)
    return message.channel.send('Вы не упомянули пользователя 🚫')
  const avatarFirst = mentionUser.displayAvatarURL({
    format: 'png',
    size: 512
  })
  const avatarSecond = message.author.displayAvatarURL({
    format: 'png',
    size: 512
  })
  message.channel.startTyping()
  const result = await FunpicService.getTrumpet(avatarSecond, avatarFirst)
  if (!result) {
    await message.channel.stopTyping()
    return message.channel.send('Упсс.. произошла какая то ошибка 😔')
  }
  await message.channel.send({
    files: [
      {
        attachment: Buffer.from(result),
        name: `${message.author.id}-trumpet.jpg`
      }
    ]
  })
  await message.channel.stopTyping()
}

export default {
  execute,
  info: {
    name: 'trumpet',
    aliases: ['труба', 'пинг']
  }
}
