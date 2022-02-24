import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Locations as LocationEntity } from '@prisma/client';

@Injectable()
export class LocationEntityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdAsync(id: string): Promise<LocationEntity | undefined> {
    return await this.prisma.locations.findUnique({
      where: {
        id,
      },
    });
  }

  async findByDeviceTypeAndDeviceIdAsync(deviceType: 1 | 2, deviceId: string): Promise<LocationEntity | undefined> {
    return await this.prisma.locations.findFirst({
      where: {
        device_type: deviceType,
        device_id: deviceId,
      },
    });
  }
}
