import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

interface JoinWaitlistData {
  shop_id: string;
  client_id: string;
  service_id: string;
}

/**
 * Callable function to join the waitlist
 */
export const joinWaitlist = onCall<JoinWaitlistData>(async request => {
  const db = admin.firestore();

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { shop_id, client_id, service_id } = request.data;

    logger.info('Adding client to waitlist', {
      shop_id,
      client_id,
      service_id,
    });

    const waitlistRef = await db.collection('shops').doc(shop_id).collection('waitlist').add({
      shop_id,
      client_id,
      service_id,
      status: 'waiting',
      requested_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      waitlist_id: waitlistRef.id,
    };
  } catch (error) {
    logger.error('Error joining waitlist:', error);
    throw new HttpsError('internal', 'Failed to join waitlist');
  }
});
