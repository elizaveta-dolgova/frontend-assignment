export const queryKeys = {
  todos: ['todos'],
  todo: (id: string) => [queryKeys.todos, id],
};
