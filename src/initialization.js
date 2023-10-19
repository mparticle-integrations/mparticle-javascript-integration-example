var helpers = require('./helpers');

var initialization = {
    name: 'Opensend',
    initForwarder: function(forwarderSettings, testMode, userAttributes, userIdentities, processEvent, eventQueue, isInitialized, common, appVersion, appName, customFlags, clientId) {
        var oir = window._oirtrk || [];
        window._oirtrk = oir;
        var clientScript = document.createElement('script');
        clientScript.type = 'text/javascript';
        clientScript.async = true;
        clientScript.src = 'https://cdn.aggle.net/oir/oir.min.js';
        clientScript.setAttribute('oirtyp',forwarderSettings.osType);
        console.log(forwarderSettings.apiKey);
        clientScript.setAttribute('oirid', forwarderSettings.apiKey);
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(clientScript);

        helpers.fireTraffic();
    }
};

module.exports = initialization;
