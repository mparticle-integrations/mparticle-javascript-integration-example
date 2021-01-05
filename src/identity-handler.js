/*
The 'mParticleUser' is an object with methods get user Identities and set/get user attributes
Partners can determine what userIds are available to use in their SDK
Call mParticleUser.getUserIdentities() to return an object of userIdentities --> { userIdentities: {customerid: '1234', email: 'email@gmail.com'} }
For more identity types, see http://docs.mparticle.com/developers/sdk/javascript/identity#allowed-identity-types
Call mParticleUser.getMPID() to get mParticle ID
For any additional methods, see http://docs.mparticle.com/developers/sdk/javascript/apidocs/classes/mParticle.Identity.getCurrentUser().html
*/

/*
identityApiRequest has the schema:
{
  userIdentities: {
    customerid: '123',
    email: 'abc'
  }
}
For more userIdentity types, see http://docs.mparticle.com/developers/sdk/javascript/identity#allowed-identity-types
*/

function IdentityHandler(common) {
    this.common = common || {};
}
IdentityHandler.prototype.onUserIdentified = function(mParticleUser) {
    var mPUser = mParticleUser.getUserIdentities().userIdentities;
    var userId = '';

    switch (this.common.settings.userIdentificationType) {
      case ('CustomerId'):
        userId = mPUser.customerid;
        break;
      case ('Email'):
        window.UserLeap('setEmail', mPUser.email);
        break;
      default:
        userId = mPUser.customerid;
        break;
    }

    if (userId !== '' && typeof userId !== undefined) {
        window.UserLeap('setUserId', userId);
    }
};
IdentityHandler.prototype.onIdentifyComplete = function(
    mParticleUser,
    identityApiRequest
) {};
IdentityHandler.prototype.onLoginComplete = function(
    mParticleUser,
    identityApiRequest
) {};
IdentityHandler.prototype.onLogoutComplete = function(
    mParticleUser,
    identityApiRequest
) {};
IdentityHandler.prototype.onModifyComplete = function(
    mParticleUser,
    identityApiRequest
) {};

/*  In previous versions of the mParticle web SDK, setting user identities on
    kits is only reachable via the onSetUserIdentity method below. We recommend
    filling out `onSetUserIdentity` for maximum compatibility
*/
IdentityHandler.prototype.onSetUserIdentity = function(
    forwarderSettings,
    id,
    type
) {
    switch (type) {
        case 1:
            window.UserLeap('setUserId', id);
            break; 
        case 7:
            window.UserLeap('setEmail', id);
            break;
    }
};

module.exports = IdentityHandler;
