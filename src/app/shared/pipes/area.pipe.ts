import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../../core/models/area';

@Pipe({
  name: 'area'
})
export class AreaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    const area = new Area(value);
    return area.boundary.map(point => `${point.x}:${point.y}`).join(' - ');
  }

}
