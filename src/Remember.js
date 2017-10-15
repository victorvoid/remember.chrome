const utils = ({ name, periodInMinutes, log }) => {
  return ({
    stop () {
      chrome.alarms.clear(name)
      if(log){
        console.log(`[Remember] ${name} stopped`)
      }
    },

    getName(){
      return name
    },

    getPeriodInMinutes(){
      return periodInMinutes
    }
  })
}

const Remember = (props) => {
  const { name, delayInMinutes, periodInMinutes, log } = props
  return ({
    create() {
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

      return utils(...props)
    },

    check(){
      return new Promise((resolve, reject) => {
        chrome.alarms.getAll(alarms => {
          const hasAlarm = alarms.some(a => {
            return a.name == name
          })
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

export default Remember
