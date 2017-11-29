import { Forest } from '../entities/forest';

export class ForestService {

  async save(data: Partial<Forest>): Promise<Forest> {
    const forest = data.id ? await Forest.findOneById(data.id) : new Forest();
    forest.description = data.description;
    return await forest.save();
  }
}
