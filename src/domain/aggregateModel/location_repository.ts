import { Location } from './location';

export interface LocationRepository {
  createAsync: (input: Location) => Promise<Location>;
}
