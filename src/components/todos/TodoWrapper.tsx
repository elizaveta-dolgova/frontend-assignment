import {PropsWithChildren} from 'react';
import {Card} from '../Card';
import {TodoHeader} from './List/TodoHeader';

export function TodoWrapper({children}: PropsWithChildren) {
  return (
    <Card>
      <TodoHeader />
      {children}
    </Card>
  );
}
