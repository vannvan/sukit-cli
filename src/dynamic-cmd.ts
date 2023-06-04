import path from 'path'
import glob from 'glob'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { Log } from './libs/log.js'
import commander, { Command } from 'commander'
const __dirname = dirname(fileURLToPath(import.meta.url))
import argv from './libs/dev/argv.js'

export default class DynamicCMD {
  public ctx: any
  cliInfo: {
    version: string
    name: string
    description: string
  }
  constructor(cliInfo: { version: string; name: string; description: string }) {
    this.cliInfo = cliInfo
    this.ctx = this.createContext()
    this.init()
  }

  init() {
    this.genarateCommand()
  }

  createContext() {
    //
  }

  /**
   * 动态挂载cmd
   */
  async genarateCommand(): Promise<void> {
    const commandList = glob.sync(`${path.join(__dirname, './command')}/*.?(jsx|js|ts)`)

    const program = new Command()

    program
      .name(this.cliInfo.name)
      .description(this.cliInfo.description)
      .version(this.cliInfo.version)

    const { commandInput } = argv()

    try {
      // 执行具体有效的命令
      const matchCmd = commandList.find(
        (item) => item.match(/(?<=d\/).+(?=.js)/)[0] === commandInput
      )
      const valid = ['-h', '--help', '-V', '--version']
      if (!matchCmd && !valid.includes(commandInput) && commandInput) {
        Log.error(`${commandInput} 命令不存在，请使用 -h 查看有效命令`)
        return
      }
      const Command = await import(matchCmd)
      const cmd = new Command.default()
      program
        .command(cmd.name)
        .description(cmd.description)
        .action((_str: string, _options) => {
          cmd.action(_options.args)
        })
    } catch (error) {
      // 什么都没传会走到这里
      for (let i = 0; i < commandList.length; i++) {
        const item = commandList[i]
        const Command = await import(item)
        const cmd = new Command.default()
        program.command(cmd.name).description(cmd.description)
      }
    } finally {
      program.parse()
    }
  }
}
