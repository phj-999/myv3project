import request from '../service/index'
import { roledatatype } from '@/types/store/role'
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

/**商品列表接口 */
interface goodsdata {
  [key: number]: { userId: number; id: number; title: string; introduce: string }
}
export interface goodslist {
  code: number
  message: string
  //data: Array<object>
  data: goodsdata
}

export const getGoodsList = () => {
  return request.get('/getGoodsList')
}

/**角色列表信息 */
export const roleListRequest = () => {
  return request.get('/getRoleList')
}

/**用户列表信息 */
export const userListRequest = () => {
  return request.get('/getUserList')
}

/**权限列表接口 */
export const authorityListRequest = () => {
  return request.get('/getAuthorityList')
}
