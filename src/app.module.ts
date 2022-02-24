import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLocationCommandHandler } from './application/commands/create_location_command_handler';
// eslint-disable-next-line max-len
import { LocationByDeviceTypeAndDeviceIdQueryHandler } from './application/queries/location_by_device_type_id_query_handler';
import { LocationDTOMapper } from './application/mappers/location_dto_mapper';
import { LocationsController } from './controllers/locations_controller';
import { LocationFactory } from './domain/aggregateModel/location_factory';
import { LocationEntityMapper } from './infrastructure/mappers/location_entity_mapper';
import { LocationEntityRepository } from './infrastructure/repositories/location_entity_repository';
import { LocationRepositoryImpl } from './infrastructure/repositories/location_repository_impl';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const domain = [LocationFactory];
const entityMapper = [LocationEntityMapper];
const entityRepositores = [LocationEntityRepository];
const repositories = [LocationRepositoryImpl];
const commandHandlers = [CreateLocationCommandHandler];
const queryHandlers = [LocationByDeviceTypeAndDeviceIdQueryHandler];
const dtoMappers = [LocationDTOMapper];
const controllers = [LocationsController];

@Module({
  imports: [CqrsModule, PrismaModule.forRoot()],
  controllers: [AppController, ...controllers],
  providers: [
    AppService,
    ...domain,
    ...entityMapper,
    ...entityRepositores,
    ...repositories,
    ...dtoMappers,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class AppModule {}
