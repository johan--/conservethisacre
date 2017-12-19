// TODO: Reuse with server side

import { IParcel } from './parcel';

export interface ITransaction {
  id: number;
  amount: number;
  parcelRef: IParcel;
}
