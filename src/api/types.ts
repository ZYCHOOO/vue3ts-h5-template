// 接口参数的类型？

// 登陆参数
export interface LoginData {
  username: string,
  password: string
}

export interface ProfileParams {
  token: string
}

// 新闻列表参数
export interface NewsListParams {
  key: string,
  type?: string,
  page?: number,
  pageSize?: number,
  isFilter?: number
}

// 新闻详情参数
export interface NewDetailParams {
  key: string,
  uniquekey: any
}