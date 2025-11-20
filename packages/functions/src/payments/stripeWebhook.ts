import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

/**
 * HTTP function to handle Stripe webhooks
 */
export const stripeWebhook = onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Missing Stripe signature');
    return;
  }

  try {
    const rawBody = req.rawBody?.toString() || JSON.stringify(req.body);
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    logger.info('Stripe webhook received', {
      type: event.type,
      id: event.id,
    });

    // TODO: Handle different webhook events
    // - payment_intent.succeeded
    // - payment_intent.payment_failed
    // - charge.refunded

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Update payment record
        break;
      case 'payment_intent.payment_failed':
        // Handle failed payment
        break;
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error}`);
  }
});
