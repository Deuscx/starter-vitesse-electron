import { tipc } from '@egoist/tipc/main'
import { shell } from 'electron'
import { windowManager } from '~main/windows/manager'
import { storePath } from './store'

const t = tipc.create()

export const router = {
  newWindow: t.procedure
    .input<string>()
    .action(async ({ input }) => {
      windowManager.get('second').loadURL(input)
    }),

  openStoreFile: t.procedure
    .action(async () => {
      shell.openPath(storePath)
    }),
}

export type Router = typeof router
