import {useTranslation} from 'react-i18next';
import {useTodo} from '../../../api/todo/queries';
import {useUpdateTodo} from '../../../api/todo/mutations';
import {Navigate, useNavigate} from 'react-router';
import {TodoRequest} from '../../../api/client';
import {TodosError} from '../TodosError';
import {SingleTodoSkeleton} from '../TodosSkeleton';
import {TodoForm} from '../../forms/TodoForm';
import {getErrorMessage} from '../../../utils/getErrorMessage';

export const EditPageContent = ({id}: {id: string}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {mutateAsync, error} = useUpdateTodo();
  const {data, isLoading, error: todoError} = useTodo(id);

  const handleSubmit = async (data: TodoRequest) => {
    try {
      await mutateAsync({id, todo: data});
      navigate('/');
    } catch (error) {}
  };

  if (todoError) {
    return <TodosError error={todoError} />;
  }

  if (isLoading) {
    return <SingleTodoSkeleton />;
  }

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  return (
    <TodoForm
      initialData={data}
      onSubmit={handleSubmit}
      title={data.title}
      submitButtonText={t('todo.form.editTask')}
      error={getErrorMessage(error, t('todo.form.editTask.error'))}
    />
  );
};
