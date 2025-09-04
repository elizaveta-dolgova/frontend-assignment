import {useParams, Navigate} from 'react-router';
import {TodoWrapper} from '../components/todos/TodoWrapper';
import {TodoDetailContent} from '../components/todos/TodoDetailContent';

export function TodoDetailPage() {
  const {id} = useParams();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  return (
    <TodoWrapper>
      <TodoDetailContent id={id} />
    </TodoWrapper>
  );
}
