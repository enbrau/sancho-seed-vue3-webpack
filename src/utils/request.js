import axios from 'axios'
import settings from '@/../settings.js'
import { requestHook, responseHook, errorHook } from '@/hooks'

const service = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: settings.client.withCredentials,
  timeout: settings.client.timeout,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

service.interceptors.request.use(
  request => {
    try {
      requestHook.call(request)
      if (/get/i.test(request.method)) {
        request.params = { ...(request.params || {}), t: Date.parse(new Date())/1000 }
      }
    } catch(e) {
      console.error('Error handling request: ', e)
    }
    return request
  },
  error => {
    try {
      errorHook.call(error)
    } catch(e) {
      console.error('Error handling request error: ', e)
    }
    return Promise.reject(error)
  }
)

service.interceptors.request.use(
  request => {
    try {
      requestHook.call(request)
      if (/get/i.test(request.method)) {
        request.params = { ...(request.params || {}), t: Date.parse(new Date())/1000 }
      }
      // TODO
    } catch(e) {
      console.error('Error handling request: ', e)
    }
    return request
  },
  error => {
    try {
      // TODO
    } catch(e) {
      console.error('Error handling request error: ', e)
    }
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    try {
      responseHook.call(response)
    } catch(e) {
      errorHook.call(e)
    }

    const data = response.data

    if (data) {
      if (data.flag === 0) {
        return data
      } else {
        if (response.status === 401 || data.flag === -6 || data.flag === -9) {
          ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('subscriber/logout').then(() => {
              location.reload()
            })
          })  
        } else {
          const message = data.msg || 'Request error!'
          return Promise.reject(new Error(message))
        }
      }
    } else {
      throw new Error(response.data)
    }
  },
  error => {
    try {
      errorHook.call(error)
    } catch(e) {
      console.error('Error handling response error: ', e)
    }
    return Promise.reject(error)
  }
)

export default service

export function getBaseUrl() {
  let baseUrl = process.env.CONTEXT_PATH === 'PATHNAME' ? window.location.pathname : process.env.CONTEXT_PATH
  if (baseUrl.length > 0) {
    const paths = baseUrl.split('/')
    let temp = ''
    for (const path of paths) {
      if (path && path.indexOf('.') < 0) {
        temp += '/' + path
      }
    }
    baseUrl = temp
  }
  if (baseUrl.length > 0 && baseUrl.lastIndexOf('/') === baseUrl.length - 1) {
    return baseUrl.substr(0, baseUrl.length - 1)
  }
  return baseUrl === '/' ? '' : baseUrl
}
