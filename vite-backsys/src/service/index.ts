import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { errorHandle } from '@/utils/errorHandle'

/**
 * axios 请求配置
 */
//axios创建实例
const service = axios.create({
  //默认地址
  baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
  // baseURL: "",
  //请求超时时间
  timeout: 3000,
  //配置请求头
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //处理业务代码 ex:是否存在token
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status

    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      errorHandle(status)
    }
    return response
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    return Promise.resolve(error)
  }
)

export default service
