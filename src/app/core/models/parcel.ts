// TODO: Reuse with server side
import { IForest } from './forest';
import { Point } from './area';
import { ITransaction } from './transaction';

export interface IParcel {
  id: number;
  cost: number;
  area: Point[][];
  forest: IForest;

  images: any[];
  panoramas: any[];

  transactions: ITransaction[];

  // virtual
  conservedBy: any;
}
