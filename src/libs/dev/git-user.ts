import { execSync } from 'child_process'
import { ChildProcess, exec } from 'child_process'

export default async () => {
  try {
    const gitName = execSync('git config user.name')
    const gitEmail = execSync('git config user.email')
    return {
      gitName: gitName.toString().trim(),
      gitEmail: gitEmail.toString().trim(),
    }
  } catch (error) {
    return {
      gitName: '',
      gitEmail: '',
    }
  }
}
