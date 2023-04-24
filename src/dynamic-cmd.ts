import path from 'path'
import glob from 'glob'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { Log } from './libs/log.js'
import commander, { Command } from 'commander'
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class DynamicCMD {
  public ctx: any
  version: string
  constructor(version: string) {
    this.version = version
    this.ctx = this.createContext()
    this.init()
  }

  init() {
    this.genarateCommand()
  }

  createContext() {
    // const context = Object.create(Context);
    // context.config = readAllConfig();
    // context.packageJson = this.props;
    // context.app = this;
    // context.services = {};
    // context.commander = commander;
    // return context;
  }

  /**
   * 动态挂载cmd
   */
  async genarateCommand(): Promise<void> {
    const commandList = glob.sync(`${path.join(__dirname, './command')}/*.?(jsx|js|ts)`)

    let command = null

    try {
      const matchCmd = commandList.find((item) => new RegExp(process.argv[2]).test(item))
      command = await import(matchCmd)
    } catch (error) {
      command = await import(`${path.join(__dirname, './command/help.js')}`)
    }

    const cmd = new command.default()
    const program = new Command()
    program
      .command(cmd.name)
      .description(cmd.description)
      .action((str: string, options: { first: any; separator: any }) => {
        const limit = options.first ? 1 : undefined
        console.log('limit', limit)
        console.log('str', str)
        cmd.action()
      })
    program.parse()
  }
}
