import { describe, it, expect } from 'vitest';

import MeasurementUnit from '#/domain/value-objects/MeasurementUnit.js';

describe('Domain: MeasurementUnit', () => {
  it('должен создать корректный объект, если передана допустимая единица', () => {
    const unit = new MeasurementUnit('M3');
    expect(unit.value).toBe('M3');
  });

  it('должен выбрасывать ошибку, если передана недопустимая единица измерения', () => {
    expect(() => new MeasurementUnit('INVALID_UNIT')).toThrow('Невалидный тип: INVALID_UNIT');
  });
});
