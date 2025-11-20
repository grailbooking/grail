import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

/**
 * Firestore trigger to charge cancellation fees
 */
export const chargeCancellationFee = onDocumentUpdated(
  'shops/{shopId}/appointments/{appointmentId}',
  async event => {
    const { shopId, appointmentId } = event.params;

    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) {
      return;
    }

    // Check if appointment was cancelled
    if (before.status !== 'cancelled' && after.status === 'cancelled') {
      // TODO: Implement cancellation fee logic
      // - Check if within cancellation policy window
      // - Calculate fee amount
      // - Charge customer via Stripe
      // - Record payment

      logger.info('Appointment cancelled', {
        shopId,
        appointmentId,
        requiresFee: false, // Stub
      });
    }

    return null;
  }
);
