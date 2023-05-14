import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    error: number
    msg: string
    // 这里追加你的参数
    status: string
    data: {
      code: string
      message: string
      msg: string
    }
  }
  export interface AxiosRequestConfig {
    timeout?: number
    baseURL?: string
    headers?: {
      Authorization?: string
    }
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}