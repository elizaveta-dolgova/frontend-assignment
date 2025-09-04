import {VStack, Heading, Divider} from '@chakra-ui/react';
import {TodoItem} from './TodoItem';
import {TodoListResponse} from '../../../api/client';
import {TodosEmpty} from '../TodosEmpty';
import {useTranslation} from 'react-i18next';

const Section = ({title, items}: {title: string; items: TodoListResponse}) => (
  <VStack spacing="16px" w="full" align="start">
    <Heading size="3" color="text-primary">
      {title} ({items.length})
    </Heading>
    <Divider borderColor="border-gray" />
    <VStack spacing="12px" w="full" align="start">
      {items.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </VStack>
  </VStack>
);

type Props = {
  todos: TodoListResponse;
};

export function TodoList({todos}: Props) {
  const {t} = useTranslation();
  const todoItems = todos.filter((todo) => !todo.completed);
  const completedItems = todos.filter((todo) => todo.completed);

  return (
    <VStack spacing="24px" w="full" align="start">
      {todoItems.length > 0 ? (
        <Section title={t('todo.list.toDo')} items={todoItems} />
      ) : (
        <TodosEmpty />
      )}

      {completedItems.length > 0 && (
        <Section title={t('todo.list.completed')} items={completedItems} />
      )}
    </VStack>
  );
}
