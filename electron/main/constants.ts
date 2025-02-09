import { resolve } from 'node:path'
import process from 'node:process'

export const isDev = process.env.NODE_ENV === 'development'
export const preloadPath = resolve(__dirname, '../preload/index.mjs')
