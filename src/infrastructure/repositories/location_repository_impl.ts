import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Location, LocationRepository } from '@domain/aggregateModel';
import { LocationEntityMapper } from '../mappers/location_entity_mapper';

@Injectable()
export class LocationRepositoryImpl implements LocationRepository {
  constructor(private readonly prisma: PrismaService, private readonly entityMapper: LocationEntityMapper) {}

  async createAsync(input: Location): Promise<Location> {
    const newEntity = await this.prisma.locations.create({
      data: {
        id: input.properties().id,
        device_type: input.properties().device.type,
        device_id: input.properties().device.deviceId,
        latitude: input.properties().position.latitude,
        longitude: input.properties().position.longitude,
      },
    });

    return this.entityMapper.fromEntity(newEntity);
  }
}
