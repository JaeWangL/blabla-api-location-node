import { Injectable } from '@nestjs/common';
import { Location } from '@domain/aggregateModel/location';
import { LocationCreatedDTO } from '../dtos';

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
}
