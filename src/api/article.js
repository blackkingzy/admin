import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data // 注意post请求，如果这里是data，会放在请求体中，如果是params就会拼接在url后面
  })
}
