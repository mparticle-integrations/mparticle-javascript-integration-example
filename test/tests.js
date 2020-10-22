/* eslint-disable no-undef*/
describe('UserLeap Forwarder', function () {
    // -------------------DO NOT EDIT ANYTHING BELOW THIS LINE-----------------------
    var MessageType = {
            SessionStart: 1,
            SessionEnd: 2,
            PageView: 3,
            PageEvent: 4,
            CrashReport: 5,
            OptOut: 6,
            AppStateTransition: 10,
            Profile: 14,
            Commerce: 16
        },
        EventType = {
            Unknown: 0,
            Navigation: 1,
            Location: 2,
            Search: 3,
            Transaction: 4,
            UserContent: 5,
            UserPreference: 6,
            Social: 7,
            Other: 8,
            Media: 9,
            getName: function() {
                return 'blahblah';
            }
        },
        ProductActionType = {
            Unknown: 0,
            AddToCart: 1,
            RemoveFromCart: 2,
            Checkout: 3,
            CheckoutOption: 4,
            Click: 5,
            ViewDetail: 6,
            Purchase: 7,
            Refund: 8,
            AddToWishlist: 9,
            RemoveFromWishlist: 10
        },
        IdentityType = {
            Other: 0,
            CustomerId: 1,
            Facebook: 2,
            Twitter: 3,
            Google: 4,
            Microsoft: 5,
            Yahoo: 6,
            Email: 7,
            Alias: 8,
            FacebookCustomAudienceId: 9,
        },
        ReportingService = function () {
            var self = this;

            this.id = null;
            this.event = null;

            this.cb = function (forwarder, event) {
                self.id = forwarder.id;
                self.event = event;
            };

            this.reset = function () {
                this.id = null;
                this.event = null;
            };
        },
        reportService = new ReportingService();

// -------------------DO NOT EDIT ANYTHING ABOVE THIS LINE-----------------------
// -------------------START EDITING BELOW:-----------------------
// -------------------mParticle stubs - Add any additional stubbing to our methods as needed-----------------------
    mParticle.Identity = {
        getCurrentUser: function() {
            return {
                getMPID: function() {
                    return '123';
                }

            };
        }
    };
// -------------------START EDITING BELOW:-----------------------
    var MockUserLeapForwarder = function() {
        var self = this;

        // create properties for each type of event you want tracked, see below for examples
        this.trackCustomEventCalled = false;
        this.logPurchaseEventCalled = false;
        this.initializeCalled = false;

        this.trackCustomName = null;
        this.logPurchaseName = null;
        this.apiKey = null;
        this.appId = null;
        this.userId = null;
        this.userAttributes = {};
        this.userIdField = null;

        this.eventProperties = [];
        this.purchaseEventProperties = [];

        // stub your different methods to ensure they are being called properly
        this.initialize = function(appId, apiKey) {
            self.initializeCalled = true;
            self.apiKey = apiKey;
            self.appId = appId;
        };

        this.stubbedTrackingMethod = function(name, eventProperties){
            self.trackCustomEventCalled = true;
            self.trackCustomName = name;
            self.eventProperties.push(eventProperties);
            // Return true to indicate event should be reported
            return true;
        };

        this.stubbedUserAttributeSettingMethod = function(userAttributes) {
            self.userId = id;
            userAttributes = userAttributes || {};
            if (Object.keys(userAttributes).length) {
                for (var key in userAttributes) {
                    if (userAttributes[key] === null) {
                        delete self.userAttributes[key];
                    }
                    else {
                        self.userAttributes[key] = userAttributes[key];
                    }
                }
            }
        };

        this.stubbedUserLoginMethod = function(id) {
            self.userId = id;
        };
    };

    before(function () {

    });

    beforeEach(function() {
        window.MockUserLeapForwarder = new MockUserLeapForwarder();
        // Include any specific settings that is required for initializing your SDK here
        var sdkSettings = {
            clientKey: '123456',
            appId: 'abcde',
            userIdField: 'customerId'
        };
        // You may require userAttributes or userIdentities to be passed into initialization
        var userAttributes = {
            color: 'green'
        };
        var userIdentities = [{
            Identity: 'customerId',
            Type: IdentityType.CustomerId
        }, {
            Identity: 'email',
            Type: IdentityType.Email
        }];
        mParticle.forwarder.init(sdkSettings, reportService.cb, true, null, userAttributes, userIdentities);
    });

    it('should log event', function(done) {
        mParticle.forwarder.process({
            EventDataType: MessageType.PageEvent,
            EventName: 'Test Event',
            EventAttributes: {
                label: 'label',
                value: 200,
                category: 'category'
            }
        });
        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('track');
        firstCall[1].should.equal('Test Event');

        done();
    });

    it('should log page view', function(done) {
        mParticle.forwarder.process({
            EventDataType: MessageType.PageView,
            EventName: 'test name',
            EventAttributes: {
                attr1: 'test1',
                attr2: 'test2'
            }
        });
        window.UserLeap._queue.length.should.equal(0);

        done();
    });

    it('should log a product purchase commerce event', function(done) {
        mParticle.forwarder.process({
            EventName: 'Test Purchase Event',
            EventDataType: MessageType.Commerce,
            EventCategory: EventType.ProductPurchase,
            ProductAction: {
                ProductActionType: ProductActionType.Purchase,
                ProductList: [
                    {
                        Sku: '12345',
                        Name: 'iPhone 6',
                        Category: 'Phones',
                        Brand: 'iPhone',
                        Variant: '6',
                        Price: 400,
                        TotalAmount: 400,
                        CouponCode: 'coupon-code',
                        Quantity: 1
                    }
                ],
                TransactionId: 123,
                Affiliation: 'my-affiliation',
                TotalAmount: 450,
                TaxAmount: 40,
                ShippingAmount: 10,
                CouponCode: null
            }
        });
        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('track');
        firstCall[1].should.equal('Test Purchase Event');

        done();
    });

    it('should set email on set user identity of email type', function(done) {
        mParticle.forwarder.setUserIdentity('email@gmail.com', IdentityType.Email);

        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('setEmail');
        firstCall[1].should.equal('email@gmail.com');

        done();
    });

    it('should set customer id on set user identity of customer id type', function(done) {
        mParticle.forwarder.setUserIdentity('email@gmail.com', IdentityType.CustomerId);

        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('setUserId');
        firstCall[1].should.equal('email@gmail.com');

        done();
    });

    it('should set user attributes on set user attributes', function(done) {
        mParticle.forwarder.setUserAttribute('key', 'value');

        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('setAttribute');
        firstCall[1].should.equal('key');
        firstCall[2].should.equal('value');

        done();
    });

    it('should remove user attributes on remove user attributes', function(done) {
        mParticle.forwarder.removeUserAttribute('key');

        const queue = window.UserLeap._queue;
        queue.length.should.equal(1);
        const firstCall = queue[0];
        firstCall[0].should.equal('removeAttributes');
        const attributes = firstCall[1];
        attributes[0].should.equal('key');

        done();
    });
});
