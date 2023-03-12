"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const common_1 = require("@nestjs/common");
function checkPermissions(requestUserId, resourceUserId) {
    if (requestUserId !== resourceUserId) {
        throw new common_1.UnauthorizedException('User not authorized to execute this action');
    }
    return;
}
exports.checkPermissions = checkPermissions;
//# sourceMappingURL=checkPermissions.js.map