interface ICommand {
  name: string
  description: string
  ctx: any
  action(args: string[]): void
}
