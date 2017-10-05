export default class Alarm {
  constructor (name, period, packageid) {
    this.debug = false
    this._name = name
    this._period = period
  }

  check (callback) {
    chrome.alarms.getAll((alarms) => {
      const hasAlarm = alarms.some((a) => {
        return a.name == this._name
      })
      if (callback) { callback(hasAlarm) }
    })
  }

  create() {
    chrome.alarms.create(this._name, {
      delayInMinutes: this._period,
      periodInMinutes: this._period
    })
    if (this.debug) {
      console.log(`[Alarm] created, interval: ${this._period}, name: ${this._name}`)
    }
  }

  cancel () {
    chrome.alarms.clear(this._name)
    if(this.debug){
      console.log('[Alarm] cancel')
    }
  }

  toggle () {
    this.check((hasAlarm) => {
      if (hasAlarm) {
        this.cancel()
      } else {
        this.create()
      }
      this.check()
    })
  }
}
