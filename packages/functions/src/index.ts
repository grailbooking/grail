import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export { generateSlots } from './scheduling/generateSlots';
export { createAppointment } from './scheduling/createAppointment';
export { joinWaitlist } from './waitlist/joinWaitlist';
export { offerWaitlistSlot } from './waitlist/offerWaitlistSlot';
export { expireOffer } from './waitlist/expireOffer';
export { acceptOffer } from './waitlist/acceptOffer';
export { chargeCancellationFee } from './payments/chargeCancellationFee';
export { stripeWebhook } from './payments/stripeWebhook';
export { sendReminder } from './notifications/sendReminder';
export { exportReport } from './reports/exportReport';
