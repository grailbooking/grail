import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

/**
 * Scheduled function to expire waitlist offers that weren't accepted
 */
export const expireOffer = onSchedule('every 5 minutes', async () => {
  const db = admin.firestore();

  try {
    const now = admin.firestore.Timestamp.now();

    const expiredOffersQuery = db
      .collectionGroup('waitlist')
      .where('status', '==', 'offered')
      .where('offer_expires_at', '<=', now);

    const expiredOffers = await expiredOffersQuery.get();

    logger.info(`Found ${expiredOffers.size} expired offers`);

    const batch = db.batch();

    expiredOffers.forEach(doc => {
      batch.update(doc.ref, {
        status: 'expired',
      });
    });

    await batch.commit();
  } catch (error) {
    logger.error('Error expiring offers:', error);
    throw error;
  }
});
