import { permissions } from "./constant";
export default function hasPermission(
    moduleName: string,
    role: string,
    permissionType: string
): boolean {
    if (!permissions.hasOwnProperty(moduleName)) {
        console.log("1>>>>>>>>>>>>>>>>>>>>>");
        return false;
    } else if (!permissions[moduleName].hasOwnProperty(permissionType)) {
        console.log("2>>>>>>>>>>>>>>>>>");
        return false;
    } else if (!permissions[moduleName][permissionType].includes(role)) {
        console.log("role is", permissions[moduleName][permissionType].includes(role));
        console.log("3>>>>>>>>>>>>>>>>>>");
        return false;
    } else {
        return true;
    }
}
