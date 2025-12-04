"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REPORT_SETTINGS = exports.DEFAULT_WAITLIST_SETTINGS = exports.DEFAULT_REMINDER_SETTINGS = exports.DEFAULT_CANCELLATION_POLICY = exports.DEFAULT_POS_SETTINGS = exports.DEFAULT_WORKFORCE_SETTINGS = exports.DEFAULT_PAYMENT_SETTINGS = exports.DEFAULT_BOOKING_SETTINGS = exports.DEFAULT_SHOP_BRANDING = exports.DEFAULT_OPENING_HOURS = void 0;
exports.DEFAULT_OPENING_HOURS = {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '10:00', close: '16:00' },
    sunday: { open: '00:00', close: '00:00', closed: true },
};
exports.DEFAULT_SHOP_BRANDING = {
    primaryColor: '#C9A962',
    secondaryColor: '#1A1A1A',
};
exports.DEFAULT_BOOKING_SETTINGS = {
    mode: 'both',
    queueMode: 'client_choice',
    receptionist: false,
    marketplaceEnabled: true,
    widgetEmbedAllowed: true,
};
exports.DEFAULT_PAYMENT_SETTINGS = {
    processor: 'stripe',
    payoutMode: 'shop',
    tipTiming: 'in_person',
    taxRate: 0,
    currency: 'USD',
    allowedMethods: ['card', 'cash'],
};
exports.DEFAULT_WORKFORCE_SETTINGS = {
    type: 'w2',
    businessModel: 'commission',
    tipDistribution: 'per_barber',
};
exports.DEFAULT_POS_SETTINGS = {
    mode: 'centralized',
};
exports.DEFAULT_CANCELLATION_POLICY = {
    minNoticeHours: 24,
    lateCancelPct: 50,
    noShowPct: 100,
    graceMin: 15,
    autoCharge: false,
};
exports.DEFAULT_REMINDER_SETTINGS = {
    defaultSchedule: ['24h', '1h'],
    channels: { sms: true, email: true },
};
exports.DEFAULT_WAITLIST_SETTINGS = {
    requiresCard: false,
    defaultOfferExpiryMin: 15,
    remoteJoin: true,
    maxQueueSize: null,
    fifo: true,
    confirmRequired: true,
    notifyChannel: 'sms',
};
exports.DEFAULT_REPORT_SETTINGS = {
    exportsEnabled: true,
    exportIncludesPII: false,
};
//# sourceMappingURL=firestore-types.js.map