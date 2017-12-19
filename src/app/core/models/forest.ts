// TODO: Reuse with server side

import { ForestImage } from './forest-image';
import { IParcel } from './parcel';

export interface IForest {
  id: number;
  description: string;

  images: ForestImage[];
  parcels: IParcel[];
}
