#! /usr/bin/env node
console.log("执行了command脚本");

const program = require("commander");
const inquirer = require("inquirer");
const clone = require("git-clone");
const ora = require("ora");
const shell = require("shelljs");
const log = require("tracer").colorConsole();
const updateChalk = require("../lib/update");
const setMirror = require("../lib/mirror");
const dlTemplate = require("../lib/download");
const initProject = require("../lib/init");

const projectUrl = {
  typora: "git@github.com:chenzhenjin/typora.git",
};

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "请为项目命名",
    filter: function (val) {
      return val;
    },
  },
  {
    type: "list",
    name: "type",
    message: "请选择使用的模板",
    choices: ["typora", "模板2", "模板3"],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
];
program
  .command("upgrade")
  .description("check the brother-study-cli version")
  .action(() => {
    updateChalk();
  });
program
  .command("mirror <template_mirror>")
  .description("set the template mirror")
  .action((tplMirror) => {
    setMirror(tplMirror);
  });
program
  .command("template")
  .description("downloading template from mirror")
  .action(() => {
    dlTemplate();
  });
program
  .name("brother-study-cli")
  .usage("<commands> [options]")
  .command("init <project_name>")
  .description("Create a javascript plugin project")
  .action((project) => {
    initProject(project);
  });
// 新建项目 拉取模板
// program
//   .command("init")
//   .description("用来初始化项目, 拉取模板")
//   .action(() => {
//     let loading = ora("fetching template....");
//     inquirer.prompt(questions).then((answers) => {
//       console.log("answers", answers);
//       const { projectName, type } = answers;
//       loading.start();
//       clone(`${projectUrl[type]}`, `./${projectName}`, null, function () {
//         loading.succeed();
//         log.info("项目构建完成");
//         shell.rm("-rf", `./${projectName}/.git`);
//         log.info(`清除掉${projectName}的git,记得进入npm install`);
//       });
//     });
//   });
program.version(require("../package.json").version, "-V, --version");
// 解析命令行
program.parse(process.argv);
