"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
function hasPermission(moduleName, role, permissionType) {
    if (!constant_1.permissions.hasOwnProperty(moduleName)) {
        console.log("1>>>>>>>>>>>>>>>>>>>>>");
        return false;
    }
    else if (!constant_1.permissions[moduleName].hasOwnProperty(permissionType)) {
        console.log("2>>>>>>>>>>>>>>>>>");
        return false;
    }
    else if (!constant_1.permissions[moduleName][permissionType].includes(role)) {
        console.log("role is", constant_1.permissions[moduleName][permissionType].includes(role));
        console.log("3>>>>>>>>>>>>>>>>>>");
        return false;
    }
    else {
        return true;
    }
}
exports.default = hasPermission;
//# sourceMappingURL=permission.js.map