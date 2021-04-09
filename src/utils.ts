export const onlyTS = (f: string) => f.split('.').pop() === 'ts'

export const getCommandArgs = (prefix: string, content: string) =>
  content
    .slice(prefix.length)
    .trim()
    .split(/(\s+)/)
    .filter((e: string) => e.trim().length > 0)
