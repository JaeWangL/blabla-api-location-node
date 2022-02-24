import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationInput {
  @ApiProperty({ enum: [1, 2] })
  readonly deviceType: 1 | 2;

  @ApiProperty({ type: String })
  readonly deviceId: string;

  @ApiProperty({ type: Number })
  readonly latitude: number;

  @ApiProperty({ type: Number })
  readonly longitude: number;
}

export class LocationCreatedDTO {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ enum: [1, 2] })
  readonly deviceType: 1 | 2;

  @ApiProperty({ type: String })
  readonly deviceId: string;

  @ApiProperty({ type: Number })
  readonly latitude: number;

  @ApiProperty({ type: Number })
  readonly longitude: number;
}

export class LocationDetailDTO {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ enum: [1, 2] })
  readonly deviceType: 1 | 2;

  @ApiProperty({ type: String })
  readonly deviceId: string;

  @ApiProperty({ type: Number })
  readonly latitude: number;

  @ApiProperty({ type: Number })
  readonly longitude: number;
}
