import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLocationCommand } from '../application/commands/create_location_command';
import { CreateLocationInput } from '../application/dtos/location_dtos';

@ApiTags('Accounts')
@Controller('accounts')
export class LocationsController {
  constructor(readonly commandBus: CommandBus) {}

  @Post('')
  @ApiResponse({ status: 201, description: 'New location was created successfully' })
  async createLocation(@Body() input: CreateLocationInput): Promise<void> {
    await this.commandBus.execute(
      new CreateLocationCommand(input.deviceType, input.deviceId, input.latitude, input.longitude),
    );
  }
}
