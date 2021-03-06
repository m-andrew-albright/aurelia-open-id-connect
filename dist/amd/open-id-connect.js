"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-routing", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_routing_1, open_id_connect_logger_1) {
    "use strict";

    var OpenIdConnect = function () {
        function OpenIdConnect(routerConfigurationService, logger, UserManager) {
            var _this = this;

            _classCallCheck(this, OpenIdConnect);

            this.routerConfigurationService = routerConfigurationService;
            this.logger = logger;
            this.UserManager = UserManager;
            this.LoginRedirectHandler = function () {
                _this.logger.Debug("LoginRedirectHandler");
                return _this.UserManager.getUser().then(function (user) {
                    if (user === null || user === undefined) {
                        _this.logger.Debug("user: " + user);
                        _this.logger.Debug("window.location.href: " + window.location.href);
                        return _this.UserManager.signinRedirectCallback(null);
                    }
                });
            };
            this.PostLogoutRedirectHandler = function () {
                _this.logger.Debug("PostLogoutRedirectHandler");
                return _this.UserManager.signoutRedirectCallback(null);
            };
        }

        _createClass(OpenIdConnect, [{
            key: "Configure",
            value: function Configure(routerConfiguration) {
                this.routerConfigurationService.ConfigureRouter(routerConfiguration, this.LoginRedirectHandler, this.PostLogoutRedirectHandler);
            }
        }, {
            key: "Login",
            value: function Login() {
                var _this2 = this;

                this.logger.Debug("Login");
                var stateStore = null;
                this.UserManager.clearStaleState(stateStore).then(function () {
                    var args = {};
                    _this2.UserManager.signinRedirect(args);
                });
            }
        }, {
            key: "Logout",
            value: function Logout() {
                this.logger.Debug("Logout");
                this.UserManager.signoutRedirect({});
            }
        }]);

        return OpenIdConnect;
    }();
    OpenIdConnect = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [open_id_connect_routing_1.OpenIdConnectRouting, open_id_connect_logger_1.OpenIdConnectLogger, oidc_client_1.UserManager])], OpenIdConnect);
    exports.OpenIdConnect = OpenIdConnect;
});
//# sourceMappingURL=open-id-connect.js.map