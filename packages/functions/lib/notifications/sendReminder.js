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
exports.sendReminder = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const admin = __importStar(require("firebase-admin"));
const logger = __importStar(require("firebase-functions/logger"));
exports.sendReminder = (0, scheduler_1.onSchedule)('every 1 hours', async () => {
    const db = admin.firestore();
    try {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        const appointmentsQuery = db
            .collectionGroup('appointments')
            .where('status', '==', 'scheduled')
            .where('start_time', '<=', admin.firestore.Timestamp.fromDate(tomorrow));
        const appointmentsSnapshot = await appointmentsQuery.get();
        logger.info(`Sending reminders for ${appointmentsSnapshot.size} appointments`);
        for (const appointmentDoc of appointmentsSnapshot.docs) {
            const appointment = appointmentDoc.data();
            logger.info('Would send reminder for appointment', {
                appointmentId: appointmentDoc.id,
                clientId: appointment.client_id,
            });
        }
    }
    catch (error) {
        logger.error('Error sending reminders:', error);
        throw error;
    }
});
//# sourceMappingURL=sendReminder.js.map