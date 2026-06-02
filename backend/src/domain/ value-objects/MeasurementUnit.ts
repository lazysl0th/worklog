enum EnumMeasurementValue {
  M3 = 'M3',
  M2 = 'M2',
  M = 'M',
  TON = 'TON',
  KG = 'KG',
  PCS = 'PCS',
  SECTION = 'SECTION',
}

export default class MeasurementUnit {
  #value: EnumMeasurementValue;

  constructor(value: EnumMeasurementValue) {
    this.#value = value;
  }

  get value(): EnumMeasurementValue {
    return this.#value;
  }

  change(measurementUnit: EnumMeasurementValue): void {
    this.#value = measurementUnit;
  }
}
