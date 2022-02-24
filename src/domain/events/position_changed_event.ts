import { IEvent } from '@nestjs/cqrs';

export class PositionChangedEvent implements IEvent {
  constructor(
    public readonly deviceType: 1 | 2,
    public readonly deviceId: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}
