import Store from 'electron-store'
import { isMacOS } from './constants'

interface AppConfig {
  minimizeToTray?: boolean
}

export const store = new Store<AppConfig>({
  defaults: {
    minimizeToTray: !isMacOS,
  },
})

export function getStorePath() {
  return store.path
}
