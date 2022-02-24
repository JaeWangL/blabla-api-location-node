import { Location } from './location';

export interface LocationRepository {
  createAsync: (input: Location) => Promise<Location>;

  findByIdAsync: (id: string) => Promise<Location | undefined>;

  findByDeviceTypeAndDeviceIdAsync: (deviceType: 1 | 2, deviceId: string) => Promise<Location | undefined>;
}
