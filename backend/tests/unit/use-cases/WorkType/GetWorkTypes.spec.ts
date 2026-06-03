import { describe, it, expect } from 'vitest';

import { createMockWorkType, mockWorkTypeRepository } from '../../../setup.js';

import GetWorkTypes from '#/application/use-cases/WorkType/GetWorkTypes.js';

describe('Unit: GetWorkTypes Use Case', () => {
  it('Happy Path: должен вернуть массив типов работ из репозитория', async () => {
    const useCase = new GetWorkTypes(mockWorkTypeRepository);

    const mockTypes = [createMockWorkType(), createMockWorkType()];

    mockWorkTypeRepository.getAll.mockResolvedValue(mockTypes);

    const result = await useCase.execute();

    expect(result).toEqual(mockTypes);
    expect(mockWorkTypeRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
