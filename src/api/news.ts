import { request } from "@/utils/request"
import { NewsListParams, NewDetailParams } from './types'

// 获取聚合新闻列表

export const apiGetNewsList = (params: NewsListParams) => {
  return request({
    url: '/index',
    method: 'get',
    params
  })
}

// 获取聚合新闻详情
export const apiGetNewsDetail = (params: NewDetailParams) => {
  return request({
    url: '/content',
    method: 'get',
    params
  })
}