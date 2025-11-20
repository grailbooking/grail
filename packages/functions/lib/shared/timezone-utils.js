"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toShopTimezone = toShopTimezone;
exports.getCurrentShopTime = getCurrentShopTime;
exports.formatInTimezone = formatInTimezone;
exports.parseInTimezone = parseInTimezone;
function toShopTimezone(date, _timezone) {
    return date;
}
function getCurrentShopTime(_timezone) {
    return new Date();
}
function formatInTimezone(date, _timezone, _format) {
    return date.toISOString();
}
function parseInTimezone(dateString, _timezone) {
    return new Date(dateString);
}
//# sourceMappingURL=timezone-utils.js.map