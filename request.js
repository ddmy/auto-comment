const axios = require('axios')
const config = require('./config')
const api = require('./api')
const account = require('./user/account.js')

let state = -1
const request = {
  /**
   * 获取灵感列表
   */
  async getIdeaList (data = {}, params = {}) {
    console.log(params)
    return await axios.post(api.ideaList, {}, { params })
  },
  async login (data) {
    return await axios.post(api.login, data)
  },
  async fetchUserInfo () {
    return await this.login(account[state])
  },
  async fetchNewUserInfo () {
    state++
    if (state === account.length) {
      state = 0
    }
    return await this.fetchUserInfo()
  },
  async addComment (data) {
    return await axios.post(api.addComment, data)
  }
}

axios.defaults.baseURL = config.api
axios.defaults.headers.terminaltype = 'WEB'
axios.defaults.headers.origin = config.api

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    // 对响应数据做点什么
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

module.exports = { request, axios }
