import { ICommand } from '@nestjs/cqrs';

export class CreateLocationCommand implements ICommand {
  constructor(
    readonly deviceType: 1 | 2,
    readonly deviceId: string,
    readonly latitude: number,
    readonly longitude: number,
  ) {}
}
