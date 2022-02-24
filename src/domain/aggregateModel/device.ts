import { ValueObject } from '../seedWork';

export class Device extends ValueObject {
  constructor(
    /**
     * 1; Android
     * 2: iOS
     */
    public readonly type: 1 | 2,
    public readonly deviceId: string,
  ) {
    super();
  }
}
