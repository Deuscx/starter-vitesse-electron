import { tipc } from '@egoist/tipc/main'
import { windowManager } from '~main/windows/manager'

const t = tipc.create()

export const router = {
  newWindow: t.procedure
    .input<string>()
    .action(async ({ input }) => {
      windowManager.get('second').loadURL(input)
    }),
}

export type Router = typeof router
