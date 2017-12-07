// TODO: Reuse with server side

import { ForestImage } from './forest-image';

export interface IForest {
  id: number;
  description: string;

  images: ForestImage[];
}
