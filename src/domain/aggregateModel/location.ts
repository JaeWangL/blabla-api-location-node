/* eslint-disable @typescript-eslint/lines-between-class-members */
import { AggregateRoot } from '@nestjs/cqrs';
import { PositionChangedEvent } from '../events';
import { Device } from './device';
import { Position } from './position';

export type LocationEssentialProperties = Required<{
  readonly id: string;
  readonly device: Device;
  readonly position: Position;
}>;

export type LocationProperties = LocationEssentialProperties;

export interface Location {
  properties: () => LocationProperties;
  updatePosition: (device: Device, position: Position) => void;
  commit: () => void;
}

export class LocationImpl extends AggregateRoot implements Location {
  private id: string;
  private device: Device;
  private position: Position;

  constructor(properties: LocationProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): LocationProperties {
    return {
      id: this.id,
      device: this.device,
      position: this.position,
    };
  }

  updatePosition(device: Device, position: Position): void {
    this.position = position;
    this.apply(
      Object.assign(
        new PositionChangedEvent(device.type, device.deviceId, position.latitude, position.longitude),
        this,
      ),
    );
  }
}
