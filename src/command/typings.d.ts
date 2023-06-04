interface ICommand {
  name: string
  description: string
  ctx: any
  action(args: string[]): void
}

type TTemplateItem = {
  key: string
  value: string
  cnName: string
  description: string
}

type TInitPromptKeys = 'name' | 'description' | 'author' | 'template'

type TInitPromptList = {
  name: TInitPromptKeys
  message: string
  default: string
  choices?: {}[]
}[]
