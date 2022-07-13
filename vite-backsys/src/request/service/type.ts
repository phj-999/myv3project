// 数据返回的接口
// 定义请求响应参数，不含data
export interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
export interface ResultData<T = any> extends Result {
  data?: T
}
