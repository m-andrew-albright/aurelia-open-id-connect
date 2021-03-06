var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "oidc-client", "./open-id-connect-roles"], function (require, exports, aurelia_framework_1, aurelia_router_1, oidc_client_1, open_id_connect_roles_1) {
    "use strict";
    let OpenIdConnectAuthorizeStep = class OpenIdConnectAuthorizeStep {
        constructor(userManager) {
            this.userManager = userManager;
        }
        run(navigationInstruction, next) {
            return this.userManager.getUser().then((user) => {
                if (this.RequiresRole(navigationInstruction, open_id_connect_roles_1.OpenIdConnectRoles.Authorized)) {
                    if (user === null) {
                        return next.cancel(new aurelia_router_1.Redirect("login"));
                    }
                }
                if (this.RequiresRole(navigationInstruction, open_id_connect_roles_1.OpenIdConnectRoles.Administrator)) {
                }
                return next();
            });
        }
        RequiresRole(navigationInstruction, role) {
            return navigationInstruction.getAllInstructions().some((instruction) => {
                return instruction.config.settings.roles !== undefined &&
                    instruction.config.settings.roles.indexOf(role) >= 0;
            });
        }
    };
    OpenIdConnectAuthorizeStep = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [oidc_client_1.UserManager])
    ], OpenIdConnectAuthorizeStep);
    exports.OpenIdConnectAuthorizeStep = OpenIdConnectAuthorizeStep;
});
//# sourceMappingURL=open-id-connect-authorize-step.js.map