export default class Init implements ICommand {
  public name = 'init'
  public description = '初始化仓库'
  ctx: any
  constructor(ctx: any) {
    // console.log(ctx)
    this.ctx = ctx
    // console.log('啊哈哈哈哈')
    process.on('exit', () => {
      // success(`process exit remove template: ${this.tempFolderName}`);
      //
    })
  }

  public action(args: string[]) {
    console.log('初始化项目', args)
  }
}
