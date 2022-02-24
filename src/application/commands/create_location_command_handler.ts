import { ObjectId } from 'bson';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocationFactory } from '@domain/aggregateModel/location_factory';
import { LocationRepositoryImpl } from '@infrastructure/repositories/location_repository_impl';
import { CreateLocationCommand } from './create_location_command';
import { LocationCreatedDTO } from '../dtos';
import { LocationDTOMapper } from '../mappers';

@CommandHandler(CreateLocationCommand)
export class CreateLocationCommandHandler implements ICommandHandler<CreateLocationCommand, LocationCreatedDTO> {
  constructor(
    private readonly locationRepo: LocationRepositoryImpl,
    private readonly locationFactory: LocationFactory,
    private readonly dtoMapper: LocationDTOMapper,
  ) {}

  async execute(command: CreateLocationCommand): Promise<LocationCreatedDTO> {
    const location = this.locationFactory.create(
      new ObjectId().toString(),
      command.deviceType,
      command.deviceId,
      command.latitude,
      command.longitude,
    );

    await this.locationRepo.createAsync(location);

    location.commit();

    return this.dtoMapper.toCreatedDTO(location);
  }
}
