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
exports.createAppointment = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const logger = __importStar(require("firebase-functions/logger"));
exports.createAppointment = (0, https_1.onCall)(async (request) => {
    const db = admin.firestore();
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'User must be authenticated');
    }
    try {
        const { shop_id, barber_id, client_id, service_id, start_time, end_time } = request.data;
        logger.info('Creating appointment', {
            shop_id,
            barber_id,
            client_id,
            service_id,
        });
        const appointmentRef = await db.collection('shops').doc(shop_id).collection('appointments').add({
            shop_id,
            barber_id,
            client_id,
            service_id,
            start_time: admin.firestore.Timestamp.fromDate(new Date(start_time)),
            end_time: admin.firestore.Timestamp.fromDate(new Date(end_time)),
            status: 'scheduled',
            created_at: admin.firestore.FieldValue.serverTimestamp(),
            updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
        return {
            success: true,
            appointment_id: appointmentRef.id,
        };
    }
    catch (error) {
        logger.error('Error creating appointment:', error);
        throw new https_1.HttpsError('internal', 'Failed to create appointment');
    }
});
//# sourceMappingURL=createAppointment.js.map