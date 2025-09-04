import {useQuery, useQueryClient} from '@tanstack/react-query';
import {api, TodoListResponse} from '../client';
import {queryKeys} from './queryKeys';

export const useTodos = () =>
  useQuery({
    queryKey: queryKeys.todos,
    queryFn: () => api.getTodos(),
  });

export const useTodo = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.todo(id),
    queryFn: () => api.getTodoById(id),
    initialData: () => {
      const todosData = queryClient.getQueryData(queryKeys.todos) as TodoListResponse;
      return todosData?.find((todo) => todo.id === id);
    },
  });
};
