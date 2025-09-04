import {useCreateTodo} from '../api/todo/mutations';
import {TodoRequest} from '../api/client';
import {TodoForm} from '../components/forms/TodoForm';
import {useTranslation} from 'react-i18next';
import {getErrorMessage} from '../utils/getErrorMessage';
import {useNavigate} from 'react-router';
import {Card} from '../components/Card';

export const TodoCreatePage: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {mutateAsync, error} = useCreateTodo();

  const handleSubmit = async (data: TodoRequest) => {
    try {
      await mutateAsync(data);
      navigate('/');
    } catch (error) {}
  };

  return (
    <Card>
      <TodoForm
        title={t('todo.form.newTask')}
        onSubmit={handleSubmit}
        error={getErrorMessage(error, t('todo.form.createTask.error'))}
        submitButtonText={t('todo.form.createTask')}
      />
    </Card>
  );
};
