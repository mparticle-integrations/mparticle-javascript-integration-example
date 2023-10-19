var helpers = {
    fireTraffic: function() {
        if (window.mParticle && window.mParticle.Identity) {
            var currentUser = window.mParticle.Identity.getCurrentUser();
            if (currentUser) {
                var userIdentities = currentUser.getUserIdentities();
                if (window._oirtrk && currentUser.getMPID() && userIdentities && ! userIdentities.email) {
                    window._oirtrk.push(['track', 'on-site', {MPID: currentUser.getMPID()}]);
                }
            }
        }
    },
};

module.exports = helpers;
