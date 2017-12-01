import { Forest } from '../entities/forest';
import { Parcel } from '../entities/parcel';

export class ForestService {

  /**
   * Saves forest data
   * @param {Partial<Forest>} data
   * @returns {Promise<Forest>}
   */
  async save(data: Partial<Forest>): Promise<Forest> {
    const forest = data.id ? await Forest.findOneById(data.id) : new Forest();
    forest.description = data.description;
    return await forest.save();
  }

  /**
   * Deletes forest from database
   * @param {number} id
   * @returns {Promise<any>}
   */
  async delete(id: number): Promise<any> {
    // todo: check cascade options, why not working
    await Parcel.createQueryBuilder().delete().where('forestId = :forestId', {forestId: id})
      .execute();
    return await Forest.removeById(id);
  }
}
