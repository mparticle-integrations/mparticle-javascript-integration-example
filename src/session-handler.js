const hookService = require('./hookService');
var sessionHandler = {
    onSessionStart: function(event) {
        hookService.handlePoastCall(event);
        window.MockXYZForwarder && window.MockXYZForwarder.track(event.EventName,event.EventAttributes);
    },
    onSessionEnd: function(event) {
        hookService.handlePoastCall(event);
        window.MockXYZForwarder && window.MockXYZForwarder.track(event.EventName,event.EventAttributes);
    }
};

module.exports = sessionHandler;
