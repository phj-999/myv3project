import { ElNotification } from 'element-plus'

/**
 * 请求失败后的错误统一处理
 * @param status 请求失败的状态码
 */
export const errorHandle = (status: number) => {
  //状态码判断
  switch (status) {
    case 302:
      ElNotification.error('接口重定向了！')
      break
    case 400:
      ElNotification.error('发出的请求有错误，服务器没有进行新建或修改数据的操作==>' + status)
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      ElNotification.error('token:登录失效==>' + status)
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      ElNotification.error('登录过期,用户得到授权，但是访问是被禁止的==>' + status)
      break
    case 404:
      ElNotification.error('网络请求不存在==>' + status)
      break
    case 406:
      ElNotification.error('请求的格式不可得==>' + status)
      break
    case 408:
      ElNotification.error(' 请求超时！')
      break
    case 410:
      ElNotification.error('请求的资源被永久删除，且不会再得到的==>' + status)
      break
    case 422:
      ElNotification.error('当创建一个对象时，发生一个验证错误==>' + status)
      break
    case 500:
      ElNotification.error('服务器发生错误，请检查服务器==>' + status)
      break
    case 502:
      ElNotification.error('网关错误==>' + status)
      break
    case 503:
      ElNotification.error('服务不可用，服务器暂时过载或维护==>' + status)
      break
    case 504:
      ElNotification.error('网关超时==>' + status)
      break
    default:
      ElNotification.error('其他错误错误==>' + status)
  }
}
