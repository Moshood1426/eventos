"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = exports.SerializeRes = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
const SerializeRes = (dto) => {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
};
exports.SerializeRes = SerializeRes;
class SerializeInterceptor {
    constructor(dto) {
        this.dto = dto;
    }
    intercept(ctx, handler) {
        return handler.handle().pipe((0, rxjs_1.map)((data) => {
            return (0, class_transformer_1.plainToClass)(this.dto, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize.interceptor.js.map