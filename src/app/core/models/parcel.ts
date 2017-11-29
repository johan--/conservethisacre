// TODO: Reuse with server side
import { IForest } from './forest';

export interface IParcel {
  id: number;
  cost: number;
  forest: IForest;
}
