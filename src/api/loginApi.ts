import { LoginData, ProfileParams } from "./types"
import { request } from '@/utils/request'

export const apiLogin = (data: LoginData) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const apiGetProfile = (params: ProfileParams) => {
  return request({
    url: '/user/profile',
    method: 'get',
    params
  })
}

export const apiLogout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

