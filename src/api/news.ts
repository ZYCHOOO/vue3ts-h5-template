import { request } from "@/utils/request"

// 获取聚合新闻列表
export const apiGetNewsList = (params) => {
  return request({
    url: '/index',
    method: 'get',
    params
  })
}

// 获取聚合新闻详情
export const apiGetNewsDetail = (params) => {
  return request({
    url: '/content',
    method: 'get',
    params
  })
}