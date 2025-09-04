import {Navigate} from 'react-router';
import {useTodo} from '../../api/todo/queries';
import {TodosError} from './TodosError';
import {SingleTodoSkeleton} from './TodosSkeleton';
import {TodoItem} from './List/TodoItem';

type Props = {
  id: string;
};
export function TodoDetailContent({id}: Props) {
  const {data, isLoading, error} = useTodo(id);

  if (error) {
    return <TodosError error={error} />;
  }

  if (isLoading) {
    return <SingleTodoSkeleton />;
  }

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  return <TodoItem todo={data} />;
}
