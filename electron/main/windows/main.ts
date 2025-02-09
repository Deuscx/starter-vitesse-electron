import type { WindowCreateConfig } from './manager'
import { join } from 'node:path'
import process from 'node:process'
import { ipcMain, shell } from 'electron'
import { isDev, preloadPath } from '../constants'

export const mainWinConfig: WindowCreateConfig = {
  options: {
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: isDev,
      preload: preloadPath,
      sandbox: false,
    },
  },
  callback(window, windowManager) {
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

    ipcMain.handle('new-window', () => {
      windowManager.get('second').show()
    })

    // Prevent main window from closing and hide it instead.
    window.on('close', (event) => {
      event.preventDefault()
      window.hide()
    })
  },
}
