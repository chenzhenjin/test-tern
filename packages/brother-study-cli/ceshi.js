/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-11 14:05:25
 * @LastEditTime: 2020-12-11 14:41:56
 * @Descripttion: 模块描述
 */
const path = require('path')
const shell = require("shelljs");
const symbols = require('log-symbols')
const chalk = require("chalk");
const ora = require("ora")
const logger = require("tracer").colorConsole();
console.log(symbols)
console.log(chalk.red(123))
console.log(chalk.yellow(123))
console.log(chalk.cyan(123))
console.log(chalk.blue(123))
console.log(chalk.bgGreen(123))
console.log(chalk.bgRed(123))
const spinner = ora(chalk.bgRed('download'))
spinner.start()
setTimeout(()=>{
  spinner.succeed()
  shell.cd('template')
  shell.ls(path.resolve(__dirname, './template')).forEach(name=>{
    console.log(name)
  })
},2000)

logger.info('132')
logger.warn('123')