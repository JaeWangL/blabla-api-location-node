import { Injectable } from '@nestjs/common';
import { Locations as LocationEntity } from '@prisma/client';
import { Location } from '@domain/aggregateModel/location';
import { LocationCreatedDTO, LocationDetailDTO } from '../dtos';

@Injectable()
export class LocationDTOMapper {
  toCreatedDTO(domain: Location): LocationCreatedDTO {
    const properties = domain.properties();
    return {
      id: properties.id,
      deviceType: properties.device.type,
      deviceId: properties.device.deviceId,
      latitude: properties.position.latitude,
      longitude: properties.position.longitude,
    };
  }

  toQueryDetailDTO(entity: LocationEntity): LocationDetailDTO {
    return {
      id: entity.id,
      deviceType: entity.device_type as 1 | 2,
      deviceId: entity.device_id,
      // @ts-ignore NOTE: There are no solution to converting number to Prisma.Decimal
      latitude: entity.latitude,
      // @ts-ignore NOTE: There are no solution to converting number to Prisma.Decimal
      longitude: entity.longitude,
    };
  }
}
