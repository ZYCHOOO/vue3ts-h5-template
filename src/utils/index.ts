// 获取环境变量
export const getEnvValue = (type: string) => {
  return import.meta.env[type]
}

// 获取url中参数
export const getQueryString = (url: string, queryKey: string) => {
  const reg = new RegExp(`&{1}${queryKey}\\=[a-zA-Z0-9_-]+`, 'g')
  const matchResult = url.replace(/\?/g, '&').match(reg)![0]
  return matchResult.substr(matchResult.indexOf('=') + 1)
}