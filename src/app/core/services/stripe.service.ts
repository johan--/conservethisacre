import { Injectable } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { StripeChargeRequest } from '../interfaces/stripe-charge.request';
import { ApiService } from './api.service';

const URL = '/parcels/charge/';

@Injectable()
export class StripeService {

  stripe: Stripe;

  constructor(private scriptLoader: ScriptLoaderService, private api: ApiService) {
  }

  /**
   * Loads stripe library
   * @returns {Observable<boolean>}
   */
  load(): Observable<boolean> {
    return this.scriptLoader.load('https://js.stripe.com/v3/');
  }

  loadCheckout(): Observable<any> {
    return this.scriptLoader.load('https://checkout.stripe.com/checkout.js')
      .map(v => StripeCheckout);
  }

  /**
   * Returns observable resolved to stripe instance
   * @returns {Observable<Stripe>}
   */
  getStripe(): Observable<Stripe> {
    return this.stripe ? of(this.stripe) : this.load()
      .do(() => this.stripe = new Stripe(environment.stripeApiKey))
      .map(() => this.stripe);
  }

  /**
   * Initiates credit card charge
   * @param charge
   */
  charge(charge: StripeChargeRequest): Observable<any> {
    return this.api.post(URL + charge.parcelId, charge);
  }
}
