import { LoginData } from "./types"
import { request } from '@/utils/request'

export const apiLogin = (data: LoginData) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

