import {useMutation, useQueryClient, QueryClient} from '@tanstack/react-query';
import {api, TodoRequest, TodoResponse, TodoListResponse} from '../client';
import {queryKeys} from './queryKeys';

function getTodoSnapshot(queryClient: QueryClient, todoId?: string) {
  const previousTodos = queryClient.getQueryData<TodoListResponse>(queryKeys.todos);
  const previousTodo = todoId
    ? queryClient.getQueryData<TodoResponse>(queryKeys.todo(todoId))
    : undefined;

  return {previousTodos, previousTodo};
}

function rollbackTodoData(
  queryClient: QueryClient,
  context: {previousTodos?: TodoListResponse; previousTodo?: TodoResponse} | undefined,
  todoId?: string
) {
  if (context?.previousTodos) {
    queryClient.setQueryData(queryKeys.todos, context.previousTodos);
  }
  if (context?.previousTodo && todoId) {
    queryClient.setQueryData(queryKeys.todo(todoId), context.previousTodo);
  }
}

function invalidateTodoQueries(queryClient: QueryClient, todoId?: string) {
  queryClient.invalidateQueries({queryKey: queryKeys.todos});
  if (todoId) {
    queryClient.invalidateQueries({queryKey: queryKeys.todo(todoId)});
  }
}

function updateTodoInList(
  queryClient: QueryClient,
  todoId: string,
  updater: (todo: TodoResponse) => TodoResponse
) {
  queryClient.setQueryData<TodoListResponse>(queryKeys.todos, (old) => {
    if (!old) return old;
    return old.map((todo) => (todo.id === todoId ? updater(todo) : todo));
  });
}

function removeTodoFromList(queryClient: QueryClient, todoId: string) {
  queryClient.setQueryData<TodoListResponse>(queryKeys.todos, (old) => {
    if (!old) return old;
    return old.filter((todo) => todo.id !== todoId);
  });
}

function updateIndividualTodo(
  queryClient: QueryClient,
  todoId: string,
  updater: (todo: TodoResponse) => TodoResponse
) {
  queryClient.setQueryData<TodoResponse>(queryKeys.todo(todoId), (old) => {
    if (!old) return old;
    return updater(old);
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteTodo(id),
    onMutate: async (id) => {
      const snapshot = getTodoSnapshot(queryClient, id);

      removeTodoFromList(queryClient, id);
      queryClient.removeQueries({queryKey: queryKeys.todo(id)});

      return snapshot;
    },
    onError: (_err, id, context) => {
      rollbackTodoData(queryClient, context, id);
    },
    onSettled: (_, __, id) => {
      invalidateTodoQueries(queryClient, id);
    },
  });
}

export function useToggleCompleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, isComplete}: {id: string; isComplete: boolean}) =>
      isComplete ? api.markTodoIncomplete(id) : api.markTodoComplete(id),
    onMutate: async ({id, isComplete}) => {
      const snapshot = getTodoSnapshot(queryClient, id);

      updateTodoInList(queryClient, id, (todo) => ({...todo, completed: !isComplete}));
      updateIndividualTodo(queryClient, id, (todo) => ({...todo, completed: !isComplete}));

      return snapshot;
    },
    onError: (_err, variables, context) => {
      rollbackTodoData(queryClient, context, variables.id);
    },
    onSettled: (_, __, variables) => {
      invalidateTodoQueries(queryClient, variables.id);
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<TodoResponse, Error, TodoRequest>({
    mutationFn: (todo: TodoRequest) => api.createTodo(todo),
    onSuccess: () => {
      invalidateTodoQueries(queryClient);
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, todo}: {id: string; todo: TodoRequest}) => api.updateTodo(id, todo),
    onMutate: async ({id, todo}) => {
      const snapshot = getTodoSnapshot(queryClient, id);

      updateTodoInList(queryClient, id, (existingTodo) => ({
        ...existingTodo,
        ...todo,
      }));

      updateIndividualTodo(queryClient, id, (old) => ({
        ...old,
        ...todo,
      }));

      return snapshot;
    },
    onError: (_err, variables, context) => {
      rollbackTodoData(queryClient, context, variables.id);
    },
    onSettled: (_, __, variables) => {
      invalidateTodoQueries(queryClient, variables.id);
    },
  });
}
