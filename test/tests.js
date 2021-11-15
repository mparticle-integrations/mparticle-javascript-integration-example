/* eslint-disable no-undef*/
describe('Google Analytics 4 Event Forwarder', function() {
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
            Commerce: 16,
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
            },
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
            RemoveFromWishlist: 10,
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
        ReportingService = function() {
            var self = this;

            this.id = null;
            this.event = null;

            this.cb = function(forwarder, event) {
                self.id = forwarder.id;
                self.event = event;
            };

            this.reset = function() {
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
                },
            };
        },
    };
    // -------------------START EDITING BELOW:-----------------------
    var mockGA4EventForwarder = function() {
        var self = this;

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

        this.stubbedTrackingMethod = function(name, eventProperties) {
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
                    } else {
                        self.userAttributes[key] = userAttributes[key];
                    }
                }
            }
        };

        this.stubbedUserLoginMethod = function(id) {
            self.userId = id;
        };
    };

    before(function() {});

    beforeEach(function() {
        window.mockGA4EventForwarder = new mockGA4EventForwarder();
        // Include any specific settings that is required for initializing your SDK here
        var sdkSettings = {
            clientKey: '123456',
            appId: 'abcde',
            userIdField: 'customerId',
        };
        // You may require userAttributes or userIdentities to be passed into initialization
        var userAttributes = {
            color: 'green',
        };
        var userIdentities = [
            {
                Identity: 'customerId',
                Type: IdentityType.CustomerId,
            },
            {
                Identity: 'email',
                Type: IdentityType.Email,
            },
            {
                Identity: 'facebook',
                Type: IdentityType.Facebook,
            },
        ];
        mParticle.forwarder.init(
            sdkSettings,
            reportService.cb,
            true,
            null,
            userAttributes,
            userIdentities
        );
    });

    it('should set user attribute', function(done) {
        mParticle.forwarder.setUserAttribute('foo', 'bar');

        window.dataLayer[0][2].should.have.property('foo', 'bar');

        done();
    });

    it('should log a page event', function(done) {
        mParticle.forwarder.process({
            EventDataType: MessageType.PageEvent,
            EventName: 'test name',
            EventAttributes: {
                attr1: 'test1',
                attr2: 'test2',
            },
            CustomFlags: {},
        });

        // TODO: Update MAPPEDNAME, add any mapped event attrs above, and below to the `result`
        // var result = [
        //     'event',
        //     MAPPEDNAME,
        //     {
        //         mapped_foo1: 'bar1',
        //         mapped_foo2: 'bar2',
        //     },
        // ];

        // window.dataLayer[0][2].should.match(result);

        done();
    });

    it('should log page view', function(done) {
        mParticle.forwarder.process({
            EventDataType: MessageType.PageEvent,
            EventName: 'test name',
            EventAttributes: {
                attr1: 'test1',
                attr2: 'test2',
            },
            CustomFlags: {
                'Google.Title': 'Foo Page Title',
                'Google.Location': '/foo',
            },
        });

        // TODO: Update MAPPEDNAME and any mapped event attributes/parameters
        // var result = [
        //     'event',
        //     MAPPEDNAME,
        //     {
        //         page_title: 'Foo Page Title',
        //         page_location: '/foo',
        //     },
        // ];
        // window.dataLayer[0][2].should.match(result);

        done();
    });

    it('should log a product purchase commerce event', function(done) {
        // mParticle.forwarder.process({
        //     EventName: 'Test Purchase Event',
        //     EventDataType: MessageType.Commerce,
        //     EventCategory: EventType.ProductPurchase,
        //     ProductAction: {
        //         ProductActionType: ProductActionType.Purchase,
        //         ProductList: [
        //             {
        //                 Sku: '12345',
        //                 Name: 'iPhone 6',
        //                 Category: 'Phones',
        //                 Brand: 'iPhone',
        //                 Variant: '6',
        //                 Price: 400,
        //                 TotalAmount: 400,
        //                 CouponCode: 'coupon-code',
        //                 Quantity: 1
        //             }
        //         ],
        //         TransactionId: 123,
        //         Affiliation: 'my-affiliation',
        //         TotalAmount: 450,
        //         TaxAmount: 40,
        //         ShippingAmount: 10,
        //         CouponCode: null
        //     }
        // });
        //
        // window.mockGA4EventForwarder.trackCustomEventCalled.should.equal(true);
        // window.mockGA4EventForwarder.trackCustomName.should.equal('Purchase');
        //
        // window.mockGA4EventForwarder.eventProperties[0].Sku.should.equal('12345');
        // window.mockGA4EventForwarder.eventProperties[0].Name.should.equal('iPhone 6');
        // window.mockGA4EventForwarder.eventProperties[0].Category.should.equal('Phones');
        // window.mockGA4EventForwarder.eventProperties[0].Brand.should.equal('iPhone');
        // window.mockGA4EventForwarder.eventProperties[0].Variant.should.equal('6');
        // window.mockGA4EventForwarder.eventProperties[0].Price.should.equal(400);
        // window.mockGA4EventForwarder.eventProperties[0].TotalAmount.should.equal(400);
        // window.mockGA4EventForwarder.eventProperties[0].CouponCode.should.equal('coupon-code');
        // window.mockGA4EventForwarder.eventProperties[0].Quantity.should.equal(1);

        done();
    });

    it('should set customer id user identity on user identity change', function(done) {
        // var fakeUserStub = {
        //     getUserIdentities: function() {
        //         return {
        //             userIdentities: {
        //                 customerid: '123'
        //             }
        //         };
        //     },
        //     getMPID: function() {
        //         return 'testMPID';
        //     },
        //     setUserAttribute: function() {
        //
        //     },
        //     removeUserAttribute: function() {
        //
        //     }
        // };
        //
        // mParticle.forwarder.onUserIdentified(fakeUserStub);
        //
        // window.mockGA4EventForwarder.userId.should.equal('123');

        done();
    });
});
