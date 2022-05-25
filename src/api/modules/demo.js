import request from '@/utils/request'

export function demoApi() {
  return request({
    url: '/demo/api',
    method: 'get'
  })
}
