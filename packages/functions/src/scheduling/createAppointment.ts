import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

interface CreateAppointmentData {
  shop_id: string;
  barber_id: string;
  client_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
}

/**
 * Callable function to create a new appointment
 * Validates slot availability and creates the appointment
 */
export const createAppointment = onCall<CreateAppointmentData>(async request => {
  const db = admin.firestore();

  // Check authentication
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { shop_id, barber_id, client_id, service_id, start_time, end_time } = request.data;

    // TODO: Implement appointment creation logic
    // - Validate slot is still available
    // - Check for conflicts
    // - Create appointment document
    // - Update availability
    // - Send confirmation notification

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
  } catch (error) {
    logger.error('Error creating appointment:', error);
    throw new HttpsError('internal', 'Failed to create appointment');
  }
});
