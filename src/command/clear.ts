export default class Clear implements ICommand {
  public name = 'clear'
  public description = '清除缓存'
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
    console.log('清除缓存', args)
  }
}
