import * as Stripe from 'stripe';

export class StripeService {

  stripe = new Stripe(STRIPE_PUBLIC_API_KEY);

  /**
   * Initiates credit card charge
   */
  charge() {

  }
}
