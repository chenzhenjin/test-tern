/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-12-10 17:35:37
 * @LastEditTime: 2020-12-11 10:23:38
 * @Descripttion: 模块描述
 */
const fse = require("fs-extra");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const path = require("path");
const dlTemplate = require("./download");

async function initProject(projectName) {
  try {
    const exists = await fse.pathExists(projectName);
    if (exists) {
      console.log(symbols.error, chalk.red("the project already exists"));
    } else {
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "set a global name for javaScript plugin",
            default: "Default",
          },
        ])
        .then(async (answers) => {
          const initSpinner = ora(chalk.cyan("initializing project..."));
          initSpinner.start();
          //先是命令行 brother-study-cli被链接到brother-study-cli的目录，__dirname所以不是当前目录
          const templatePath = path.resolve(__dirname, "../template/");
          const processPath = process.cwd();
          const LcProjectName = projectName.toLowerCase();
          const targetPath = `${processPath}/${LcProjectName}`;
          const exists = await fse.pathExists(templatePath);
          if (!exists) {
            await dlTemplate();
          }
          try {
            await fse.copy(templatePath, targetPath);
          } catch (err) {
            console.log(symbols.error, chalk.red(`copy template failed${err}`));
          }
          const multiMeta = {
            project_name: LcProjectName,
            global_name: answers.name,
          };
          const multiFiles = [`${targetPath}/package.json`];
          for (let i = 0; i < multiFiles.length; i++) {
            try {
              const multiFilesContent = await fse.readFile(
                multiFiles[i],
                "utf8"
              );
              const multiFilesResult = await handlebars.compile(
                multiFilesContent
              )(multiMeta);
              await fse.outputFile(multiFiles[i], multiFilesResult);
            } catch (err) {
              initSpinner.text = chalk.red(`initialize project failed${err}`);
              initSpinner.fail();
              process.exit();
            }
          }
          initSpinner.text = `initialize project successful`;
          initSpinner.succeed();
          console.log(
            `To get started: cd ${chalk.yellow(LcProjectName)} 
            ${chalk.yellow("npm install")} or ${chalk.yellow("yarn install")}
            ${chalk.yellow("npm run dev")} or ${chalk.yellow("yarn run dev")}`
          );
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log(
              symbols.error,
              chalk.red(
                "Prompt couldn't be rendered in the current environment."
              )
            );
          } else {
            console.log(symbols.error, chalk.red(error));
          }
        });
    }
  } catch (err) {
    console.error(err)
		process.exit()
  }
}

module.exports = initProject
