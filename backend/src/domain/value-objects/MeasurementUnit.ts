export enum EnumMeasurementValue {
  M3 = 'M3',
  M2 = 'M2',
  M = 'M',
  TON = 'TON',
  KG = 'KG',
  PCS = 'PCS',
  SECTION = 'SECTION',
}

export default class MeasurementUnit {
  readonly EnumMeasurementValueSet = new Set<string>(Object.values(EnumMeasurementValue));
  #value: EnumMeasurementValue;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error(`Невалидный тип: ${value}`);
    }
    this.#value = value;
  }

  get value(): EnumMeasurementValue {
    return this.#value;
  }

  isValid(value: string): value is EnumMeasurementValue {
    return this.EnumMeasurementValueSet.has(value);
  }
}
