export const providesList = <T extends { id: string | number }, Tag extends string>(
  result: readonly T[] | undefined,
  tag: Tag,
) =>
  result
    ? [...result.map(({ id }) => ({ type: tag, id })), { type: tag, id: 'LIST' }]
    : [{ type: tag, id: 'LIST' }];
