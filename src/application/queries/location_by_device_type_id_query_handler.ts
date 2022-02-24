import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LocationEntityRepository } from '@infrastructure/repositories/location_entity_repository';
import { LocationByDeviceTypeAndDeviceIdQuery } from './location_by_device_type_id_query';
import { LocationDetailDTO } from '../dtos';
import { LocationDTOMapper } from '../mappers';

@QueryHandler(LocationByDeviceTypeAndDeviceIdQuery)
export class LocationByDeviceTypeAndDeviceIdQueryHandler
  implements IQueryHandler<LocationByDeviceTypeAndDeviceIdQuery, LocationDetailDTO>
{
  constructor(private readonly entityRepo: LocationEntityRepository, private readonly dtoMapper: LocationDTOMapper) {}

  async execute(query: LocationByDeviceTypeAndDeviceIdQuery): Promise<LocationDetailDTO> {
    const location = await this.entityRepo.findByDeviceTypeAndDeviceIdAsync(query.deviceType, query.deviceId);
    if (!location) {
      throw new NotFoundException('There is no location by conditions');
    }

    return this.dtoMapper.toQueryDetailDTO(location);
  }
}
