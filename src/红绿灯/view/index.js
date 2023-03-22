const OPTION = [
  { label: '红灯', type: 'red', time: 5 },
  { label: '黄灯', type: 'yellow', time: 3 },
  { label: '绿灯', type: 'green', time: 4 },
]
const OPTION_HASH = OPTION.map(o => o.type)
const LIGHT_CLASS = 'light'

const getNextLight = (index) => {
  const len = optionResult.length
  if (!len) {
    return false
  }

  const i = !index && index != 0 || index === len - 1 ? 0 : index + 1

  return optionResult[i].type
}

const generatePromise = (obj, index) => {
  return () => {
    const { type, time } = obj
    let usedTime = 0
    const bom = getCurLight(type)

    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (!run) {
          clearInterval(timer)
          throw new Error()
        }

        usedTime++
        if (usedTime >= time) {
          const nextLight = getNextLight(index)
          clearInterval(timer)
          if (nextLight) {
            resolve(nextLight)
          } else {
            reject(false)
          }
        } else {
          updateLightTime(bom, time - usedTime)
        }
      }, 1000)
    })
  }
}

const closeLightAll = () => {
  const allBox = document.querySelectorAll('.box_item-content')
  allBox.forEach(box => {
    box.classList.remove(`${LIGHT_CLASS}`)
    updateLightTime(box)
  })
}
const getCurLight = (type) => {
  return document.querySelector(`.${LIGHT_CLASS}--${type}`)
}
const openLight = (type, time) => {
  const curBox = getCurLight(type)
  curBox.classList.add(`${LIGHT_CLASS}`)
  updateLightTime(curBox, time)
}
const updateLightTime = (lightBox, time = '') => {
  const todo = () => {
    lightBox.innerHTML = time
  }

  if (time > 0 && time <= 3) {
    lightBox.innerHTML = ''
    const timer = setTimeout(() => {
      clearTimeout(timer)
      todo()
    }, 140)
  } else {
    todo()
  }
}
const changeLight = (type, time) => {
  closeLightAll()
  openLight(type, time)
}

let run = false
const setRun = (flag, btn) => {
  btn.disabled = flag
  run = flag
}

const loop = async () => {
  const promiseArr = optionResult.map((item, index) => {
    const fn = generatePromise(item, index)
    fn.time = item.time
    return fn
  })
  while (run) {
    let nextType = getNextLight()

    for (let i = 0; i < promiseArr.length; i++) {
      changeLight(nextType, promiseArr[i].time)

      const p = promiseArr[i]
      nextType = await p()
    }
  }
}

const createLightBox = (type) => {
  const boxItem = document.createElement('div')
  boxItem.setAttribute('class', 'box_item')

  const boxLight = document.createElement('div')
  boxLight.setAttribute('class', `box_item-content ${LIGHT_CLASS}--${type}`)

  boxItem.appendChild(boxLight)

  return boxItem
}
const createLightBoxAll = () => {
  const root = document.querySelector('.box')
  OPTION_HASH.forEach(type => {
    const boxItem = createLightBox(type)
    root.appendChild(boxItem)
  })
}

const OPTION_CLASS = 'option_item'
const createInputBox = ({ label, time, type }) => {
  const boxItem = document.createElement('div')
  boxItem.setAttribute('class', `${OPTION_CLASS} ${OPTION_CLASS}--${type}`)

  const boxLabel = document.createElement('span')
  boxLabel.innerHTML = `${label}：`
  boxItem.appendChild(boxLabel)

  const boxInput = document.createElement('input')
  boxInput.value = time
  boxItem.appendChild(boxInput)

  return boxItem
}
const createInputBoxAll = () => {
  const root = document.querySelector('.option-group')
  OPTION.forEach(item => {
    const boxItem = createInputBox(item)
    root.appendChild(boxItem)
  })
}
const toggleInputBoxAll = (flag) => {
  const root = document.querySelector('.option-group')
  root.style.visibility = flag ? 'visible' : 'hidden'
}

let optionResult = []
const getOption = () => {
  optionResult = OPTION.filter(item => item.time >= 0).reduce((total, cur) => {
    const box = document.querySelector(`.${OPTION_CLASS}--${cur.type}`)
    const input = box.querySelector('input')
    const obj = { ...cur, time: Number(input.value || '') }
    total.push(obj)
    return total
  }, [])
}
const bindBtns = () => {
  const startBtn = document.querySelector('#btn-start-id')
  startBtn.onclick = () => {
    setRun(true, startBtn)
    // toggleInputBoxAll(false)
    getOption()
    loop()
  }

  const resetBtn = document.querySelector('#btn-reset-id')
  resetBtn.onclick = () => {
    setRun(false, startBtn)
    closeLightAll()
    // toggleInputBoxAll(true)
  }
}

const init = () => {
  window.onload = () => {
    createInputBoxAll()
    bindBtns()
    createLightBoxAll()
  }
}

init()
