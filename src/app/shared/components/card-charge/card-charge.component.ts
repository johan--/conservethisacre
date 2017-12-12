import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StripeService } from '../../../core/services/stripe.service';
// [bad]
import * as parcel from '../../../parcels/actions/parcel.actions';
import { Store } from '@ngrx/store';
import { IParcel } from '../../../core/models/parcel';

const style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

@Component({
  selector: 'app-card-charge',
  templateUrl: './card-charge.component.html',
  styleUrls: ['./card-charge.component.scss']
})
export class CardChargeComponent implements OnInit {

  @ViewChild('formElement') formElementRef: ElementRef;

  @Input() amount: number;
  @Input() parcel: IParcel;

  handler: any;

  constructor(private stripeService: StripeService, private store: Store<any>) {
  }

  ngOnInit() {
    this.stripeService.loadCheckout().take(1).subscribe(() => {
      this.handler = StripeCheckout.configure({
        key: 'pk_test_CG03L5QOlr4JWgkX1kJMkJtV',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: (token) => {
          this.charge(token);
        }
      });
    });
  }

  /**
   * Sends charge request to our server
   * @param token
   */
  charge(token: any) {
    this.store.dispatch(new parcel.Charge({
      parcelId: this.parcel.id,
      email: token.email,
      token: token.id,
      amount: this.amount
    }));
  }

  pay(event) {
    event.preventDefault();

    this.handler.open({
      name: 'Conserve this acre',
      description: 'Conserve',
      amount: this.amount
    });
  }
}
