import { Injectable } from '@nestjs/common';
import { Locations as LocationEntity } from '@prisma/client';
import { Location, LocationFactory } from '@domain/aggregateModel';
import { BaseMapper } from './base_mapper';

@Injectable()
export class LocationEntityMapper implements BaseMapper<LocationEntity, Location> {
  constructor(private readonly domainFactory: LocationFactory) {}

  toEntity(domain: Location): LocationEntity {
    const properties = domain.properties();
    return {
      id: properties.id,
      device_type: properties.device.type,
      device_id: properties.device.deviceId,
      // @ts-ignore NOTE: There are no solution to converting number to Prisma.Decimal
      latitude: properties.position.latitude,
      // @ts-ignore NOTE: There are no solution to converting number to Prisma.Decimal
      longitude: properties.position.longitude,
    };
  }

  fromEntity(entity: LocationEntity): Location {
    return this.domainFactory.reconstitute({
      id: entity.id,
      device: {
        type: entity.device_type as 1 | 2,
        deviceId: entity.device_id,
      },
      position: {
        latitude: entity.latitude.toNumber(),
        longitude: entity.longitude.toNumber(),
      },
    });
  }
}
