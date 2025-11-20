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
exports.offerWaitlistSlot = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const admin = __importStar(require("firebase-admin"));
const logger = __importStar(require("firebase-functions/logger"));
exports.offerWaitlistSlot = (0, firestore_1.onDocumentUpdated)('shops/{shopId}/appointments/{appointmentId}', async (event) => {
    const db = admin.firestore();
    const { shopId } = event.params;
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) {
        return;
    }
    if (before.status !== 'cancelled' && after.status === 'cancelled') {
        logger.info('Appointment cancelled, offering to waitlist', {
            shopId,
            appointmentId: event.params.appointmentId,
        });
        const waitlistQuery = db
            .collection('shops')
            .doc(shopId)
            .collection('waitlist')
            .where('status', '==', 'waiting')
            .where('service_id', '==', after.service_id)
            .orderBy('requested_at', 'asc')
            .limit(1);
        const waitlistSnapshot = await waitlistQuery.get();
        if (!waitlistSnapshot.empty) {
            const waitlistDoc = waitlistSnapshot.docs[0];
            if (waitlistDoc) {
                await waitlistDoc.ref.update({
                    status: 'offered',
                    offered_at: admin.firestore.FieldValue.serverTimestamp(),
                    offer_expires_at: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000)),
                    slot_start: after.start_time,
                    slot_end: after.end_time,
                });
            }
        }
    }
    return null;
});
//# sourceMappingURL=offerWaitlistSlot.js.map