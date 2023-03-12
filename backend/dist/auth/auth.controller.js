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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../decorator/current-user.decorator");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const auth_service_1 = require("./auth.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const register_user_dto_1 = require("./dto/register-user.dto");
const serialize_user_res_dto_1 = require("./dto/serialize-user-res.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_payload_dto_1 = require("./dto/user_payload.dto");
const authenticate_user_1 = require("./jwt/authenticate_user");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    registerUser(body) {
        return this.authService.register(body);
    }
    loginUser(body) {
        return this.authService.login(body);
    }
    updateUser(body, user) {
        return this.authService.updateUser(body, user);
    }
    updatePassword(body, user) {
        return this.authService.updatePassword(body, user);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, serialize_interceptor_1.SerializeRes)(serialize_user_res_dto_1.SerializeUserDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, serialize_interceptor_1.SerializeRes)(serialize_user_res_dto_1.SerializeUserDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Patch)('/update-user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, authenticate_user_1.AuthenticateUser)(),
    (0, common_1.Patch)('/update-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto,
        user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('/api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map