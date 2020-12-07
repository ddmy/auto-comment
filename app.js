const _ = require('lodash')
const { request, axios } = require('./request.js')
const writeFile = require('./write.js')
const getComment = require('./user/comment.js')

const STATE = {
  totalSize: null,
  fetchListConfig: {
    page: 1,
    limit: 10
  }
}

async function start () {
  // await login()
  await getIdeaList()
}

async function login () {
  // 登录
  const loginResult = await request.fetchNewUserInfo()
  if (loginResult.code === 200) {
    axios.defaults.headers.authorization = loginResult.data.token
  } else {
    throw new Error('登录失败')
  }
}
// 获取列表
async function getIdeaList () {
  await login()
  // 获取灵感列表
  const result = await request.getIdeaList({}, STATE.fetchListConfig)
  if (result.code === 200) {
    if (!STATE.totalSize) {
      STATE.totalSize = result.data.totalSize
    }
    const ideaIdList = _.map(result.data.datas, (item) => item.id)
    STATE.fetchListConfig.page += 1
    await comment(ideaIdList)
    if (STATE.totalSize > 0) {
      await getIdeaList()
    }
  } else {
    writeFile('./log/error.log', '读取失败')
  }
}
// 添加评论
async function comment (idList) {
  const all = _.map(idList, (id) => {
    return request.addComment({
      content: getComment(),
      instanceId: id
    })
  })
  await Promise.all(all)
  console.log(idList)
  console.log(`第${STATE.fetchListConfig.page}页跑完...`)
  STATE.totalSize -= STATE.fetchListConfig.limit
}

start()
