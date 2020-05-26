var initialization = {
    name: 'AdobeTarget',
    initForwarder: function(
        forwarderSettings,
        testMode,
        userAttributes,
        userIdentities,
        processEvent,
        eventQueue,
        isInitialized
    ) {
        if (!testMode) {
            // Adobe Target's at.js file should be added by the client and loaded on their own. However, if they aren't loaded, we will load it here.
            var adobeTargetPresent = window.adobe && window.adobe.target;
            if (!adobeTargetPresent) {
                var clientScript = document.createElement('script');
                clientScript.type = 'text/javascript';
                clientScript.async = true;
                clientScript.src =
                    'https://www.clientscript.com/static/clientSDK.js'; // <---- Update this to be your script
                (
                    document.getElementsByTagName('head')[0] ||
                    document.getElementsByTagName('body')[0]
                ).appendChild(clientScript);
                clientScript.onload = function() {
                    if (window.adobe.target && eventQueue.length > 0) {
                        // Process any events that may have been queued up while forwarder was being initialized.
                        for (var i = 0; i < eventQueue.length; i++) {
                            processEvent(eventQueue[i]);
                        }
                        // now that each queued event is processed, we empty the eventQueue
                        eventQueue = [];
                    }
                    // Initialization of Adobe Target occurs at bottom of client's at.js file
                };
            }
        } else {
            // For testing, you should fill out this section in order to ensure any required initialization calls are made,
            // clientSDKObject.initialize(forwarderSettings.apiKey)
        }
    },
};

module.exports = initialization;
