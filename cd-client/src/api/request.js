import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ali.xnngs.cn:3003',
  timeout: 50 * 1000
})

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
