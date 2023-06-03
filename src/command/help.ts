export default class Help implements ICommand {
  public name = 'help'
  public description = '帮助'
  ctx: any
  constructor(ctx: any) {
    // console.log(ctx)
    this.ctx = ctx
    process.on('exit', () => {
      // success(`process exit remove template: ${this.tempFolderName}`);
      //
    })
  }

  action(args: string[]) {
    console.log('帮助', args)
  }
}
