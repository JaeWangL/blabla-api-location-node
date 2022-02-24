import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLocationCommand } from '../application/commands/create_location_command';
import { LocationByDeviceTypeAndDeviceIdQuery } from '../application/queries/location_by_device_type_id_query';
import { CreateLocationInput, LocationCreatedDTO, LocationDetailDTO } from '../application/dtos/location_dtos';

@ApiTags('Accounts')
@Controller('accounts')
export class LocationsController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('')
  @ApiResponse({ status: 201, description: 'New location was created successfully', type: LocationCreatedDTO })
  async createLocation(@Body() input: CreateLocationInput): Promise<LocationCreatedDTO> {
    return await this.commandBus.execute(
      new CreateLocationCommand(input.deviceType, input.deviceId, input.latitude, input.longitude),
    );
  }

  @Get('type/:type/id/:id')
  @ApiResponse({
    status: 200,
    type: LocationDetailDTO,
  })
  @ApiParam({ name: 'type', enum: ['1', '2'] })
  @ApiParam({ name: 'id', type: String })
  async getLocationByDeviceTypeAndDeviceId(
    @Param('type') type: '1' | '2',
    @Param('id') id: string,
  ): Promise<LocationDetailDTO> {
    // TODO: Support dynamic `type`
    return await this.queryBus.execute(new LocationByDeviceTypeAndDeviceIdQuery(1, id));
  }
}
