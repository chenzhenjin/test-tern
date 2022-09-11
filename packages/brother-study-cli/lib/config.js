/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-10 16:10:42
 * @LastEditTime: 2020-12-10 17:06:32
 * @Descripttion: 模块描述
 */
const fse = require('fs-extra')
const path = require('path')
const jsonConfig = {
  name: 'brother-study-cli',
  mirror: 'git@github.com:chenzhenjin/typora.git'
}
const configPath = path.resolve(__dirname, '../config.json')
async function defConfig() {
  try {
    await fse.outputJSON(configPath, jsonConfig)
  } catch(err){
    console.error(err);
    process.exit()
  }
}

module.exports = defConfig