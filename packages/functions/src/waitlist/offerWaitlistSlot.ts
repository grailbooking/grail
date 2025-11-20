import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

/**
 * Firestore trigger to offer waitlist slots when appointments are cancelled
 */
export const offerWaitlistSlot = onDocumentUpdated(
  'shops/{shopId}/appointments/{appointmentId}',
  async event => {
    const db = admin.firestore();
    const { shopId } = event.params;

    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) {
      return;
    }

    // Check if appointment was cancelled
    if (before.status !== 'cancelled' && after.status === 'cancelled') {
      logger.info('Appointment cancelled, offering to waitlist', {
        shopId,
        appointmentId: event.params.appointmentId,
      });

      // TODO: Implement waitlist offering logic
      // - Find next person on waitlist for this service
      // - Create offer with expiration time
      // - Send notification to client
      // - Schedule expiration check

      // Stub implementation
      const waitlistQuery = db
        .collection('shops')
        .doc(shopId as string)
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
            offer_expires_at: admin.firestore.Timestamp.fromDate(
              new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            ),
            slot_start: after.start_time,
            slot_end: after.end_time,
          });
        }
      }
    }

    return null;
  }
);
