import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> {
    error: number;
    msg: string;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}