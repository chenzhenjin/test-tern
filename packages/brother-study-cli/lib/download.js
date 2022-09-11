/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-10 16:57:48
 * @LastEditTime: 2020-12-10 18:47:50
 * @Descripttion: 模块描述
 */
const download = require("download");
const clone = require("git-clone");
const log = require("tracer").colorConsole();
const shell = require("shelljs");
const ora = require("ora");
const chalk = require("chalk");
const fse = require("fs-extra");
const path = require("path");
const defConfig = require("./config");
const cfgPath = path.resolve(__dirname, "../config.json");
const tplPath = path.resolve(__dirname, "../template");
async function dlTemplate() {
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    dlAction();
  } else {
    await defConfig();
    await dlAction();
  }
}
async function dlAction() {
  try {
    await fse.remove(tplPath);
  } catch (err) {
    console.error(err);
    process.exit();
  }
  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan("Downloading template..."));
  dlSpinner.start();
  try {
    await clone(
      `${jsonConfig.mirror}`,
      path.resolve(__dirname, "../template/"),
      null,
      function () {
        log.info("项目构建完成");
        shell.rm("-rf", `${path.resolve(__dirname, "../template/")}/.git`);
        log.info(`清除掉template的git,记得进入npm install`);
      }
    );
    // await download(jsonConfig.mirror, path.resolve(__dirname, "../template/"), {
    //   extract: true,
    // });
  } catch (err) {
    dlSpinner.text = chalk.red(`Downloading template failed${err}`);
    dlSpinner.fail();
    process.exit();
  }
  dlSpinner.text = "Downloading template successful";
  dlSpinner.succeed();
}

module.exports = dlTemplate;
