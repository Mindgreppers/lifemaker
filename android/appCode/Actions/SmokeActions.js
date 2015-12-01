var Reflux = require('reflux')

var SmokeActions = Reflux.createActions({
  'addSmokeSignal':{},
  'smokeSignal_Thanks':{},
  'smokeSignal_NoThanks':{},
  'smokeSignal_PutOff':{},
  'smokeSignal_Restart':{},
})

module.exports = SmokeActions
