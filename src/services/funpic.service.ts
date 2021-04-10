import axios from 'axios'
import consola from 'consola'
const API = 'https://funpic-api.herokuapp.com/api'

type memeName = 'agree' | 'error' | 'flashbacks' | 'rickroll'

export class FunpicService {
  private static fetch = axios.create({
    baseURL: API,
    responseType: 'arraybuffer'
  })

  static async getByName(
    name: memeName,
    url: string
  ): Promise<ArrayBuffer | null> {
    try {
      const { data } = await this.fetch.get(name, {
        params: {
          url
        }
      })
      return <ArrayBuffer>data
    } catch (e) {
      consola.error(e)
      return null
    }
  }

  static async getDemotivator(
    url: string,
    args: string[]
  ): Promise<ArrayBuffer | null> {
    try {
      const { data } = await this.fetch.get('demotivator', {
        params: {
          url,
          args: JSON.stringify(args)
        }
      })
      return <ArrayBuffer>data
    } catch (e) {
      consola.error(e)
      return null
    }
  }

  static async getError(url: string): Promise<ArrayBuffer | null> {
    try {
      const { data } = await this.fetch.get('error', {
        params: {
          url
        }
      })
      return <ArrayBuffer>data
    } catch (e) {
      consola.error(e)
      return null
    }
  }

  static async getTrumpet(
    urlfirst: string,
    urlsecond: string
  ): Promise<ArrayBuffer | null> {
    const { data } = await this.fetch.get('trumpet', {
      params: {
        urlfirst,
        urlsecond
      }
    })
    return <ArrayBuffer>data
  }
}
