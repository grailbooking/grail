import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

/**
 * Scheduled function to send appointment reminders
 */
export const sendReminder = onSchedule('every 1 hours', async () => {
  const db = admin.firestore();

  try {
    // Find appointments starting in 24 hours
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);

    const appointmentsQuery = db
      .collectionGroup('appointments')
      .where('status', '==', 'scheduled')
      .where('start_time', '<=', admin.firestore.Timestamp.fromDate(tomorrow));

    const appointmentsSnapshot = await appointmentsQuery.get();

    logger.info(`Sending reminders for ${appointmentsSnapshot.size} appointments`);

    // TODO: Implement reminder sending
    // - Send email reminders
    // - Send SMS reminders
    // - Mark as reminded

    for (const appointmentDoc of appointmentsSnapshot.docs) {
      const appointment = appointmentDoc.data();

      logger.info('Would send reminder for appointment', {
        appointmentId: appointmentDoc.id,
        clientId: appointment.client_id,
      });
    }
  } catch (error) {
    logger.error('Error sending reminders:', error);
    throw error;
  }
});
