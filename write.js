const path = require('path')
const fs = require('fs')

// 同步写入
function writeFile(options) {
  const { file, data } = options
  fs.appendFileSync(path.join(__dirname, file), '\n' + data, 'utf8', function (err) {
    if (err) throw err
    console.log(`log 以记录${file}`)
  })
}

module.exports = writeFile
