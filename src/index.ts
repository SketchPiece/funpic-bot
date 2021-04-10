require('dotenv').config()
import { ClientWrapper } from './ClientWrapper'
import consola from 'consola'

const token = process.env.BOT_TOKEN || null
const prefix = process.env.PREFIX || '!'

const bot = new ClientWrapper(prefix)

bot.on('ready', () => {
  consola.success('Bot has been successfully logged in!')
  bot?.user?.setActivity(`${prefix}help`, { type: 'WATCHING' })
})

bot.on('message', bot.commandsHandler)

async function start() {
  if (!token) return consola.error('You must to provide a token!')
  await bot.loadCommands('./commands')
  bot.login(token)
}

start()
  .then(() => consola.info('Bot authorization...'))
  .catch(e => consola.error(e))
