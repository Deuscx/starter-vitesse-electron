import type { WindowCreateConfig } from './manager'
import { join } from 'node:path'
import process from 'node:process'
import { shell } from 'electron'
import { isDev } from '../constants'

export const mainWinConfig: WindowCreateConfig = {
  options: {
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: isDev,
      // preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  },
  callback(window, _windowManager) {
    window.on('ready-to-show', () => {
      window.show()
    })

    window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (isDev && process.env.ELECTRON_RENDERER_URL) {
      window.loadURL(process.env.ELECTRON_RENDERER_URL)
    }
    else {
      window.loadFile(join(__dirname, '../renderer/index.html'))
    }
  },
}
