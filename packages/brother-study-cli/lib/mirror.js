/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-10 16:36:52
 * @LastEditTime: 2020-12-10 16:48:16
 * @Descripttion: 模块描述
 */
const symbols = require("log-symbols");
const fse = require("fs-extra");
const path = require("path");
const defConfig = require("./config");
const chalk = require("chalk");
const cfgPath = path.resolve(__dirname, "../config.json");
async function setMirror(link) {
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    mirrorAction(link);
  } else {
    await defConfig();
    mirrorAction(link);
  }
}
async function mirrorAction(link) {
  try{
    const jsonConfig = await fse.readJson(cfgPath)
    jsonConfig.mirror = link
    await fse.writeJson(cfgPath, jsonConfig)
    console.log(symbols.success, 'set the mirror successful')
  }catch(error){
    console.log(symbols.error, chalk.red(`set the mirror fail${error}`))
    process.exit()
  }
}
module.exports = setMirror