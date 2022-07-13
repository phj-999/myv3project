import request from '../service/index'

// 登录成功后返回的token
export interface LoginResData {
  token: string
}
// 登录信息
interface accountData {
  username: string
  password: string
}

/**登录的post接口 */
export const loginRequest = (params: accountData) => {
  return request.post<LoginResData>('/login', params)
}
