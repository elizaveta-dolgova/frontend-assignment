import {useParams, Navigate} from 'react-router';
import {Card} from '../components/Card';
import {EditPageContent} from '../components/todos/Edit/EditPageContent';

export const TodoEditPage = () => {
  const {id} = useParams<{id: string}>();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card>
      <EditPageContent id={id} />
    </Card>
  );
};
