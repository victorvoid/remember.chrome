const utils = ({ name, period, log }) => {
  return ({
    stop () {
      chrome.alarms.clear(name)
      if(log){
        console.log('[Remember] stopped')
      }
    },

    getName(){
      return name
    },

    getPeriod(){
      return period
    }
  })
}

const Remember = (props) => {
  const { name, delay, period, log } = props
  return ({
    create() {
      chrome.alarms.create(name, {
        delayInMinutes: delay || 0,
        periodInMinutes: period
      })

      if (log) {
        console.log(`[Remember] created, period: ${period}, name: ${name}`)
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
