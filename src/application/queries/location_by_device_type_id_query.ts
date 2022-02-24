import { IQuery } from '@nestjs/cqrs';

export class LocationByDeviceTypeAndDeviceIdQuery implements IQuery {
  constructor(readonly deviceType: 1 | 2, readonly deviceId: string) {}
}
