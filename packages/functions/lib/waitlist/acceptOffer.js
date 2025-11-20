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
exports.acceptOffer = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const logger = __importStar(require("firebase-functions/logger"));
exports.acceptOffer = (0, https_1.onCall)(async (request) => {
    const db = admin.firestore();
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'User must be authenticated');
    }
    try {
        const { shop_id, waitlist_id } = request.data;
        const waitlistRef = db.collection('shops').doc(shop_id).collection('waitlist').doc(waitlist_id);
        const waitlistDoc = await waitlistRef.get();
        if (!waitlistDoc.exists) {
            throw new https_1.HttpsError('not-found', 'Waitlist entry not found');
        }
        const waitlistData = waitlistDoc.data();
        if (waitlistData?.status !== 'offered') {
            throw new https_1.HttpsError('failed-precondition', 'Offer not available');
        }
        await waitlistRef.update({
            status: 'accepted',
            accepted_at: admin.firestore.FieldValue.serverTimestamp(),
        });
        return {
            success: true,
        };
    }
    catch (error) {
        logger.error('Error accepting offer:', error);
        throw new https_1.HttpsError('internal', 'Failed to accept offer');
    }
});
//# sourceMappingURL=acceptOffer.js.map