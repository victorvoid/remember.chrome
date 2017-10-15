const Remember = (props) => {
  const { name } = props
  return ({
    create: ~create({ ...props }),

    stop: ~stop({ ...props }),

    check(){
      return new Promise(resolve => {
        chrome.alarms.getAll(alarms => {
          const hasAlarm = alarms.some(a =>  a.name == name)
          resolve(hasAlarm)
        })
      })
    },

    listener(){
      return new Promise(resolve => {
        chrome.alarms.onAlarm.addListener(alarm => {
          resolve(alarm)
        })
      })
    },
  })
}

const utils = (props) => {
  const { name, periodInMinutes } = props
  return ({
    create: ~create({ ...props }),
    stop: ~stop({ ...props }),
    getName: ~name,
    getPeriodInMinutes: ~periodInMinutes
  })
}

const create = (props) => {
  const { delayInMinutes, periodInMinutes, log, name } = props
  chrome.alarms.create(name, {
    delayInMinutes: delayInMinutes || 0,
    periodInMinutes: periodInMinutes || 1
  })

  if (log) {
    console.log(`[Remember] created,
                name: ${name},
                period in minutes: ${periodInMinutes},
                delay in minutes: ${delayInMinutes}`)
  }

  return utils({ ...props })
}

const stop = (props) => {
  const { name, log } = props
  chrome.alarms.clear(name)
  if(log){
    console.log(`[Remember] ${name} stopped`)
  }
}

export default Remember
