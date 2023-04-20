import { load } from './utils/load.js';

const getSourcePath = (fileName) => {
  return `./assets/${fileName}`
}

const bindBtnEvent = () => {
  const list = [
    { id: 'load-btn1', source: getSourcePath('1.js') },
    { id: 'load-btn2', source: [getSourcePath('2.js'), getSourcePath('3.js')] },
    { id: 'load-btn3', source: getSourcePath('1.css') },
    { id: 'load-btn4', source: [getSourcePath('2.css'), getSourcePath('3.css')] },
    { id: 'load-btn5', source: getSourcePath('line.png') },
  ]

  list.forEach(item => {
    const { id, source } = item || {}
    const btn = document.getElementById(id)

    if (btn && source) {
      btn.onclick = () => {
        load(source)
      }
    }
  })
}

const init = () => {
  bindBtnEvent()
}

window.onload = () => {
  init()
}
