import { Collection } from 'discord.js'

const TIMEOUT = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 0

export class TimeoutService {
  static users: Collection<string, number> = new Collection()
  static timeout = TIMEOUT

  static checkUserTimeout(id: string) {
    const userTimeout = this.users.get(id)
    if (!userTimeout) {
      this.users.set(id, Date.now())
      return true
    }
    const timer = (Date.now() - userTimeout) / 1000
    if (timer < TIMEOUT) return false
    this.users.set(id, Date.now())
    return true
  }
}
