const hookService = require('./hookService');
var sessionHandler = {
    onSessionStart: function(event) {
        
        hookService.handlePoastCall(event);
    },
    onSessionEnd: function(event) {
        
        hookService.handlePoastCall(event);
    }
};

module.exports = sessionHandler;
