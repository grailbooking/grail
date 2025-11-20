import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

interface AcceptOfferData {
  shop_id: string;
  waitlist_id: string;
}

/**
 * Callable function to accept a waitlist offer
 */
export const acceptOffer = onCall<AcceptOfferData>(async request => {
  const db = admin.firestore();

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { shop_id, waitlist_id } = request.data;

    const waitlistRef = db.collection('shops').doc(shop_id).collection('waitlist').doc(waitlist_id);
    const waitlistDoc = await waitlistRef.get();

    if (!waitlistDoc.exists) {
      throw new HttpsError('not-found', 'Waitlist entry not found');
    }

    const waitlistData = waitlistDoc.data();

    if (waitlistData?.status !== 'offered') {
      throw new HttpsError('failed-precondition', 'Offer not available');
    }

    // TODO: Create appointment from waitlist offer
    // - Create appointment document
    // - Update waitlist status to accepted
    // - Send confirmation

    await waitlistRef.update({
      status: 'accepted',
      accepted_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
    };
  } catch (error) {
    logger.error('Error accepting offer:', error);
    throw new HttpsError('internal', 'Failed to accept offer');
  }
});
