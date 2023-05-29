import eruda from 'eruda'
import { getEnvValue } from '@/utils/index'

// eruda 初始化
export const initEruda = () => {
  const NEED_ERUDA = getEnvValue('VITE_APP_NEED_ERUDA')
  if (NEED_ERUDA === 'true') {
    eruda.init()
  }
}