import { Message } from 'discord.js'
import { ClientWrapper } from '../ClientWrapper'
import { FunpicService } from '../services/funpic.service'

async function execute(bot: ClientWrapper, message: Message, args: string[]) {
  let mentionUser = message.mentions.users.first()
  if (!mentionUser) mentionUser = message.author
  else args.shift()
  args = args
    .join(' ')
    .split(';')
    .map(arg => arg.trim())

  const avatar = mentionUser.displayAvatarURL({
    format: 'png',
    size: 512
  })
  message.channel.startTyping()
  const result = await FunpicService.getDemotivator(avatar, args)
  if (!result) {
    await message.channel.stopTyping()
    return message.channel.send('Упсс.. произошла какая то ошибка 😔')
  }
  await message.channel.send({
    files: [
      {
        attachment: Buffer.from(result),
        name: `${message.author.id}-agree.jpg`
      }
    ]
  })
  await message.channel.stopTyping()
}

export default {
  execute,
  info: {
    name: 'demotivator',
    aliases: ['демотиватор', 'dem']
  }
}
