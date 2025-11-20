"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportReport = exports.sendReminder = exports.stripeWebhook = exports.chargeCancellationFee = exports.acceptOffer = exports.expireOffer = exports.offerWaitlistSlot = exports.joinWaitlist = exports.createAppointment = exports.generateSlots = void 0;
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
var generateSlots_1 = require("./scheduling/generateSlots");
Object.defineProperty(exports, "generateSlots", { enumerable: true, get: function () { return generateSlots_1.generateSlots; } });
var createAppointment_1 = require("./scheduling/createAppointment");
Object.defineProperty(exports, "createAppointment", { enumerable: true, get: function () { return createAppointment_1.createAppointment; } });
var joinWaitlist_1 = require("./waitlist/joinWaitlist");
Object.defineProperty(exports, "joinWaitlist", { enumerable: true, get: function () { return joinWaitlist_1.joinWaitlist; } });
var offerWaitlistSlot_1 = require("./waitlist/offerWaitlistSlot");
Object.defineProperty(exports, "offerWaitlistSlot", { enumerable: true, get: function () { return offerWaitlistSlot_1.offerWaitlistSlot; } });
var expireOffer_1 = require("./waitlist/expireOffer");
Object.defineProperty(exports, "expireOffer", { enumerable: true, get: function () { return expireOffer_1.expireOffer; } });
var acceptOffer_1 = require("./waitlist/acceptOffer");
Object.defineProperty(exports, "acceptOffer", { enumerable: true, get: function () { return acceptOffer_1.acceptOffer; } });
var chargeCancellationFee_1 = require("./payments/chargeCancellationFee");
Object.defineProperty(exports, "chargeCancellationFee", { enumerable: true, get: function () { return chargeCancellationFee_1.chargeCancellationFee; } });
var stripeWebhook_1 = require("./payments/stripeWebhook");
Object.defineProperty(exports, "stripeWebhook", { enumerable: true, get: function () { return stripeWebhook_1.stripeWebhook; } });
var sendReminder_1 = require("./notifications/sendReminder");
Object.defineProperty(exports, "sendReminder", { enumerable: true, get: function () { return sendReminder_1.sendReminder; } });
var exportReport_1 = require("./reports/exportReport");
Object.defineProperty(exports, "exportReport", { enumerable: true, get: function () { return exportReport_1.exportReport; } });
//# sourceMappingURL=index.js.map