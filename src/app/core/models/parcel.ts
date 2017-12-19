// TODO: Reuse with server side
import { IForest } from './forest';
import { Point } from './area';

export interface IParcel {
  id: number;
  cost: number;
  area: Point[][];
  forest: IForest;

  images: any[];
  panoramasData: any[];

  // virtual
  conservedBy: any;
}
