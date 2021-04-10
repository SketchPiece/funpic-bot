import { Client, Message, MessageEmbed, Collection } from 'discord.js'
import { ClientWrapper } from '../ClientWrapper'
const DEV = '<@331103366774259713>'
const prefix = process.env.PREFIX || '!'

const createHelpEmbed = () =>
  new MessageEmbed()
    .setDescription(`Узнать о комманде подробнее ${prefix}help [команда]`)
    .addField(
      'FunPic - Комманды 🕹',
      `
    \`${prefix}agree [@пользователь]\`\n
    \`${prefix}error [@пользователь]\`\n
    \`${prefix}flashbacks [@пользователь]\`\n
    \`${prefix}trumpet [@пользователь]\`\n
    \`${prefix}rickroll [@пользователь]\`\n
    \`${prefix}demotivator [@пользователь] [текст];[текст];[текст]...\`\n
    `
    )
    .addField('Есть предложения? Пожелания? Баги?', `Пиши ${DEV}`)
    .setColor('#459CEC')

const createCommandHelpEmbed = (name: string, aliases: string[]) =>
  new MessageEmbed()
    .setTitle(`Команда \`${name}\``)
    .addField(
      'Псевдонимы',
      aliases.map(alias => `\`${prefix}${alias}\``).join(', ')
    )
    .setColor('#459CEC')

async function execute(bot: ClientWrapper, message: Message, args: string[]) {
  if (args[0]) {
    const command =
      bot.commands.get(args[0]) || bot.commands.get(`${prefix}${args[0]}`)
    if (command)
      return message.channel.send(
        createCommandHelpEmbed(command.info.name, command.info.aliases)
      )
    else return message.channel.send(`Комманда ${args[0]} не найдена ⚠`)
  }
  const help = createHelpEmbed()
  message.channel.send(help)
}

export default {
  execute,
  info: {
    name: 'help',
    aliases: ['помощь', 'хелб', 'помоги', 'рудз']
  }
}
