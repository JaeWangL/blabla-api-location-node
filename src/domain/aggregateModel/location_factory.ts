import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Location, LocationImpl, LocationProperties } from './location';

@Injectable()
export class LocationFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(id: string, deviceType: 1 | 2, deviceId: string, latitude: number, longitude: number): Location {
    return this.eventPublisher.mergeObjectContext(
      new LocationImpl({
        id,
        device: {
          type: deviceType,
          deviceId,
        },
        position: {
          latitude,
          longitude,
        },
      }),
    );
  }

  reconstitute(properties: LocationProperties): Location {
    return this.eventPublisher.mergeObjectContext(new LocationImpl(properties));
  }
}
