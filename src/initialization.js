var initialization = {
    name: 'vwoJavascriptIntegration',
/*  ****** Fill out initForwarder to load your SDK ******
    Note that not all arguments may apply to your SDK initialization.
    These are passed from mParticle, but leave them even if they are not being used.
    forwarderSettings contain settings that your SDK requires in order to initialize
    userAttributes example: {gender: 'male', age: 25}
    userIdentities example: { 1: 'customerId', 2: 'facebookId', 7: 'emailid@email.com' }
    additional identityTypes can be found at https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L88-L101
*/
    initForwarder: function(forwarderSettings, testMode, userAttributes, userIdentities, processEvent, eventQueue, isInitialized, common, appVersion, appName, customFlags, clientId) {
        /* `forwarderSettings` contains your SDK specific settings such as apiKey that your customer needs in order to initialize your SDK properly */
        console.log('forwarderSettings: ', forwarderSettings);
        if(forwarderSettings.account_id) {
            window._vwo_code=window._vwo_code || (function() {
                var account_id=forwarderSettings.account_id,
                version=1.4,
                settings_tolerance=2000,
                library_tolerance=2500,
                use_existing_jquery=false,
                is_spa=1,
                hide_element='body',
                /* DO NOT EDIT BELOW THIS LINE */
                f=false,d=document,vwoCodeEl=document.querySelector('#vwoCode'),code={use_existing_jquery:function(){return use_existing_jquery},library_tolerance:function(){return library_tolerance},finish:function(){if(!f){f=true;var e=d.getElementById('_vis_opt_path_hides');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=d.createElement('script');t.fetchPriority='high';t.src=e;t.type='text/javascript';t.innerText;t.onerror=function(){_vwo_code.finish()};d.getElementsByTagName('head')[0].appendChild(t)},getVersion:function(){return version},getMatchedCookies:function(e){var t=[];if(document.cookie){t=document.cookie.match(e)||[]}return t},getCombinationCookie:function(){var e=code.getMatchedCookies(/(?:^|;)\s?(_vis_opt_exp_\d+_combi=[^;$]*)/gi);e=e.map(function(e){try{var t=decodeURIComponent(e);if(!/_vis_opt_exp_\d+_combi=(?:\d+,?)+\s*$/.test(t)){return''}return t}catch(e){return''}});var i=[];e.forEach(function(e){var t=e.match(/([\d,]+)/g);t&&i.push(t.join('-'))});return i.join('|')},init:function(){window.settings_timer=setTimeout(function(){_vwo_code.finish()},settings_tolerance);var e=d.createElement('style'),t=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',i=d.getElementsByTagName('head')[0];e.setAttribute('id','_vis_opt_path_hides');vwoCodeEl&&e.setAttribute('nonce',vwoCodeEl.nonce);e.setAttribute('type','text/css');if(e.styleSheet)e.styleSheet.cssText=t;else e.appendChild(d.createTextNode(t));i.appendChild(e);var n=this.getCombinationCookie();this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+ +is_spa+'&vn='+version+(n?'&c='+n:''));return settings_timer}};window._vwo_settings_timer = code.init();return code;}());
        }
        else{
            console.error('Please update proper Event-Arch account to proceed with VWO');
        }

            // window.VWO = window.VWO || [];
            // VWO.event = VWO.event || function () {VWO.push(["event"].concat([].slice.call(arguments)))};
            
           // VWO.event("${this.customEvent.apiName}", {\n\t\t${propertiesString}});

        if (!testMode) {
            /* Load your Web SDK here using a variant of your snippet from your readme that your customers would generally put into their <head> tags
               Generally, our integrations create script tags and append them to the <head>. Please follow the following format as a guide:
            */

            // var clientScript = document.createElement('script');
            // clientScript.type = 'text/javascript';
            // clientScript.async = true;
            // clientScript.src = 'https://www.clientscript.com/static/clientSDK.js';   // <---- Update this to be your script
            // (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(clientScript);
            // clientScript.onload = function() {
            //     if (clientSDKObject && eventQueue.length > 0) {
            //         // Process any events that may have been queued up while forwarder was being initialized.
            //         for (var i = 0; i < eventQueue.length; i++) {
            //             processEvent(eventQueue[i]);
            //         }
            //          // now that each queued event is processed, we empty the eventQueue
            //         eventQueue = [];
            //     }
            //    clientSDKObject.initialize(forwarderSettings.apiKey);
            // };
        } else {
            // For testing, you should fill out this section in order to ensure any required initialization calls are made,
            // clientSDKObject.initialize(forwarderSettings.apiKey)
        }
    }
};

module.exports = initialization;
