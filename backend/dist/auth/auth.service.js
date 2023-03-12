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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_entity_1 = require("./auth.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authRepo, jwtService) {
        this.authRepo = authRepo;
        this.jwtService = jwtService;
    }
    async register(body) {
        const { email, password: rawPassword, role } = body;
        const userExists = await this.authRepo.findOne({ where: { email } });
        if (userExists) {
            throw new exceptions_1.BadRequestException('User with email exists');
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(rawPassword, salt);
        const user = this.authRepo.create(Object.assign(Object.assign({}, body), { password }));
        const result = await this.authRepo.save(user);
        const token = this.jwtService.sign({ id: result.id, role: user.role });
        return Object.assign(Object.assign({}, result), { token });
    }
    async login(body) {
        const { email, password } = body;
        const user = await this.authRepo.findOneBy({ email });
        if (!user) {
            throw new exceptions_1.NotFoundException('User with email does not exist');
        }
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) {
            throw new exceptions_1.UnauthorizedException('Invalid credentials.');
        }
        const token = this.jwtService.sign({ id: user.id, role: user.role });
        return Object.assign(Object.assign({}, user), { token });
    }
    async updateUser(body, user) {
        const userInfo = await this.authRepo.findOne({
            where: { id: user.userId },
        });
        if (!userInfo) {
            throw new exceptions_1.NotFoundException('User with id cannot be found');
        }
        if (body.email !== userInfo.email) {
            const userExists = await this.authRepo.findOne({
                where: { email: body.email },
            });
            if (userExists) {
                throw new exceptions_1.BadRequestException('User with email exists');
            }
        }
        userInfo.email = body.email;
        userInfo.name = body.name;
        const userUpdated = await this.authRepo.save(userInfo);
        const token = this.jwtService.sign({
            id: userUpdated.id,
            role: userUpdated.role,
        });
        return Object.assign(Object.assign({}, userUpdated), { token });
    }
    async updatePassword(body, user) {
        const { oldPassword, newPassword } = body;
        const userInfo = await this.authRepo.findOne({
            where: { id: user.userId },
        });
        if (!userInfo) {
            throw new exceptions_1.NotFoundException('User with id cannot be found');
        }
        console.log(userInfo.password, oldPassword);
        const confirmPassword = await bcrypt.compare(oldPassword, userInfo.password);
        if (!confirmPassword) {
            throw new exceptions_1.BadRequestException('old password is incorrect');
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        userInfo.password = password;
        const userUpdated = await this.authRepo.save(userInfo);
        const token = this.jwtService.sign({
            id: userUpdated.id,
            role: userUpdated.role,
        });
        return Object.assign(Object.assign({}, userUpdated), { token });
    }
    async getUser(userId) {
        const user = this.authRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new exceptions_1.BadRequestException('user does not exist');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map