import { ValueObject } from '../seedWork';

export class Position extends ValueObject {
  constructor(public readonly latitude: number, public readonly longitude: number) {
    super();
  }
}
