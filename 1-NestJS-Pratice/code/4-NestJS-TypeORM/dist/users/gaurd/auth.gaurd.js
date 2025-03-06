"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClass = void 0;
class AuthClass {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}
exports.AuthClass = AuthClass;
//# sourceMappingURL=auth.gaurd.js.map