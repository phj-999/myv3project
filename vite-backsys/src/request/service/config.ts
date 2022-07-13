export const api_URL = 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api'

export enum RequestEnums {
  TIMEOUT = 3000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200 // 请求成功
}
export const config = {
  // 默认地址
  baseURL: api_URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}
