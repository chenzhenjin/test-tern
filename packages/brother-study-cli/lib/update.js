/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-10 15:26:44
 * @LastEditTime: 2020-12-10 15:34:41
 * @Descripttion: 模块描述
 */
const updateNotifer = require("update-notifier");
const chalk = require("chalk");
const pkg = require("../package.json");
const notifer = updateNotifer({
  pkg,
  updateCheckInterval: 1000,
});
function updateChalk() {
  if (notifer.update) {
    console.log(
      `new version available: ${chalk.cyan(
        notifer.update.latest
      )}, it's recommanded that you update before using`
    );
    notifer.notify()
  } else {
    console.log('no new version is available')
  }
}

module.exports = updateChalk
