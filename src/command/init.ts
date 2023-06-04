import inquirer from 'inquirer'
import getGitUser from '../libs/dev/git-user.js'
export default class Init implements ICommand {
  public name = 'init'
  public description = '初始化仓库'
  ctx: any
  templates: TTemplateItem[]
  constructor(ctx: any) {
    // console.log(ctx)
    this.ctx = ctx
    this.templates = [
      {
        key: 'umi-base-template',
        value: 'umi-base-template',
        cnName: 'umi基础项目',
        description: '提供一个简易的不附带生产配置的简易项目',
      },
    ]
  }

  async templateHandler(args: string[]): Promise<TInitPromptList | undefined> {
    // TODO接收参数
    console.log('初始化项目', args)
    return new Promise(async (resolve, reject) => {
      const { gitName, gitEmail } = await getGitUser()

      const dirs = process.cwd().split('/')

      const promptList: TInitPromptList = [
        {
          name: 'template',
          message: '选择模板',
          default: this.templates[0].key,
          choices: this.templates,
        },
        {
          name: 'name',
          message: '项目名称:',
          default: dirs.at(-1),
        },
        {
          name: 'description',
          message: '项目描述:',
          default: 'A sukit project',
        },
        {
          name: 'author',
          message: '作者:',
          default: gitName,
        },
      ]

      inquirer
        .prompt(promptList)
        .then((answers) => {
          console.log('answers', answers)
          resolve(answers)
        })
        .catch(() => {
          reject(undefined)
        })
    })
  }

  public action(args: string[]) {
    this.templateHandler(args)
  }
}
