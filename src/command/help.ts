export default class Help {
  public name = 'help'
  public description = '帮助'
  constructor(ctx: any) {
    // console.log(ctx)
    process.on('exit', () => {
      // success(`process exit remove template: ${this.tempFolderName}`);
      //
    })
  }

  action() {
    console.log('帮助')
  }
}
