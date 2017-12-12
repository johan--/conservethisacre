import { Forest } from '../entities/forest';
import { Parcel } from '../entities/parcel';
import { ParcelImage } from '../entities/parcel-image';

export class ParcelService {

  /**
   * Finds all parcels
   * @returns {Promise<void>}
   */
  async find() {
    return Parcel.find();
  }

  /**
   * Saves forest data
   * @param {Partial<Forest>} data
   * @returns {Promise<Forest>}
   */
  async save(data: Partial<Parcel>): Promise<Parcel> {
    const parcel = data.id ? await Parcel.findOneById(data.id) : new Parcel();

    const values = {
      cost: data.cost,
      forest: await Forest.findOneById(data['forestId']),
    };

    const area = data.area || parcel.area;
    if (area && area instanceof Array) {
      values['area'] = () => this.areaToPolygon(area);
    }

    const qb = Parcel.createQueryBuilder();

    const query = data.id ? qb.update().set(values).where('id = :id', {id: parcel.id}) :
      qb.insert().values(values);

    return await query.execute();
  }

  /**
   * Deletes forest from database
   * @param {number} id
   * @returns {Promise<any>}
   */
  async delete(id: number): Promise<any> {
    return await Parcel.removeById(id);
  }

  private areaToPolygon(area: Array<Array<{ x: number, y: number }>>) {
    return 'ST_GeomFromText("POLYGON(' + area.map(boundary => {
      return '(' + boundary.map(point => `${point.x} ${point.y}`).join(', ') + ')';
    }) + ')")';
  }
}
