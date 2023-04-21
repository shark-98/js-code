const readline = require('readline');
const chalk = require('chalk');
const CFonts = require('cfonts');

// readline
const useReadline = () => {
  const outStream = process.stdout; // stdout 是标准输出流，是指显示器

  const rl = readline.createInterface({
    input: process.stdin, // stdin 是标准输入流，是指键盘。
    output: outStream
  });

  // 绘制
  const write = (content) => {
    rl.write(content);
  }
  // 移动光标位置
  const cursorTo = (x, y, stream = outStream) => {
    readline.cursorTo(stream, x, y)
  }
  // 清除某个位置之后的所有内容
  const clearScreenDown = (stream = outStream) => {
    readline.clearScreenDown(stream)
  }
  const clearContent = () => {
    cursorTo(0, 0);
    clearScreenDown();
  }

  return {
    write,
    cursorTo,
    clearScreenDown,
    clearContent
  }
}
const { write, cursorTo, clearContent } = useReadline()

// common
function delay (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// text
const useText = () => {
  function setTextRandomStyle (text) {
    const styles = ['redBright', 'yellowBright', 'blueBright', 'cyanBright', 'greenBright', 'magentaBright', 'whiteBright'];
    const color = styles[Math.floor(Math.random() * styles.length)];
    return chalk[color](text);
  }

  function getRandomPos () {
    const x = Math.floor(30 * Math.random());
    const y = Math.floor(10 * Math.random());
    return [x, y];
  }

  const printText = async (textArr) => {
    for (let i = 0; i < textArr.length; i++) {
      cursorTo(...getRandomPos());
      write(setTextRandomStyle(textArr[i]));
      await delay(1000);
      clearContent()
    }
  }

  return { printText }
}
const { printText } = useText()
const printTextDefault = async () => {
  const textArr = ['渐进式JavaScript 框架', '易学易用', '性能出色', '适用场景丰富的 Web 前端框架'];
  await printText(textArr)
}

// 艺术字
const useFont = () => {
  const printFont = (content, style) => {
    const text = '|' + content.join('|') // 竖线是指换行
    const prettyFont = CFonts.render(text, style);

    let startX = 50;
    let startY = 0;
    prettyFont.array.forEach((line, index) => {
      cursorTo(startX + index, startY + index);
      write(line);
    });
  }

  return { printFont }
}
const { printFont } = useFont()
const printFontDefault = () => {
  const content = ['vue', 'fast']
  const style = { font: 'block', colors: ['blue', 'yellow'] }
  printFont(content, style)
}

// 页脚
const printFooter = () => {
  cursorTo(120, 25);
  write(chalk.yellowBright('---Vue.js'));
}

async function init () {
  clearContent()
  await printTextDefault()

  printFontDefault()
  printFooter()
};
init()
