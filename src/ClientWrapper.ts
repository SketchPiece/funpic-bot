import { Client, ClientOptions, Collection, Message } from 'discord.js'
import consola from 'consola'
import fs from 'fs/promises'
import path from 'path'
import { getCommandArgs, onlyTS } from './utils'

export class ClientWrapper extends Client {
  commands: Collection<string, command> = new Collection<string, command>()
  aliases: Collection<string, string> = new Collection<string, string>()

  constructor(public prefix: string, options?: ClientOptions) {
    super(options)
  }

  async loadCommands(dir: string): Promise<void> {
    const cmdsDir = path.resolve('src', dir)
    const files = await fs.readdir(cmdsDir)
    const tsfiles = files.filter(onlyTS)
    if (tsfiles.length <= 0) return consola.info('No commands to load')
    tsfiles.forEach((file, i) => {
      const command: command = require(path.join(cmdsDir, file)).default
      this.commands.set(command.info.name, command)
      command.info.aliases.forEach(alias => {
        this.aliases.set(alias, command.info.name)
      })
      consola.info(`${i + 1}. ${file} loaded...`)
    })
    consola.info(`All commands loaded!`)
  }

  commandsHandler(message: Message) {
    if (message.author.bot) return
    if (!message.content.startsWith(this.prefix)) return
    const args = getCommandArgs(this.prefix, message.content)
    const cmd = args.shift()?.toLowerCase()
    if (!cmd) return
    if (this.commands.has(cmd))
      this.commands.get(cmd)?.execute(this, message, args)
    const aliasCommand = this.aliases.get(cmd)
    if (aliasCommand)
      this.commands.get(aliasCommand)?.execute(this, message, args)
  }
}

export type commandExecutor = (
  bot: ClientWrapper,
  message: Message,
  args: string[]
) => void

export type commandInfo = {
  name: string
  aliases: string[]
}

export type command = {
  execute: commandExecutor
  info: commandInfo
}
