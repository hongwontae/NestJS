"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserInterceptor = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let CurrentUserInterceptor = class CurrentUserInterceptor {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async intercept(context, handler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        if (userId) {
            const user = await this.userService.findOneUser(userId);
            request.currentUser = user;
        }
        return handler.handle();
    }
};
exports.CurrentUserInterceptor = CurrentUserInterceptor;
exports.CurrentUserInterceptor = CurrentUserInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], CurrentUserInterceptor);
//# sourceMappingURL=curent-user-interceptor.js.map