import {
  HStack,
  VStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {Link, useNavigate} from 'react-router';
import {TodoResponse} from '../../../api/client';
import {useDeleteTodo, useToggleCompleteTodo} from '../../../api/todo/mutations';
import {RoundCheckbox} from '../../forms/RoundedCheckbox';
import {DeleteIcon, EditIcon, MoreIcon} from '../../icons';
import {useTranslation} from 'react-i18next';

interface TodoItemProps {
  todo: TodoResponse;
}

export const TodoItem = ({todo}: TodoItemProps) => {
  const {t} = useTranslation();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleCompleteTodo();
  const navigate = useNavigate();

  const handleToggle = () => {
    toggleTodo.mutate({id: todo.id, isComplete: todo.completed});
  };

  const handleEdit = () => {
    navigate(`/todos/${todo.id}/edit`);
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  return (
    <HStack spacing="12px" align="start" w="full" position="relative">
      <Link to={`/todos/${todo.id}`} style={{position: 'absolute', inset: 0}} />
      <RoundCheckbox isChecked={todo.completed} onChange={handleToggle} />
      <VStack align="start" spacing="8px" flex="1" minW="0">
        <Text
          fontWeight="text.alternative"
          color={todo.completed ? 'text-secondary' : 'text-primary'}
          fontSize="text.base"
          lineHeight="base"
        >
          {todo.title}
        </Text>

        {todo.description && (
          <Text color="text-secondary" fontSize="text.small" lineHeight="small" noOfLines={3}>
            {todo.description}
          </Text>
        )}
      </VStack>

      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          icon={<MoreIcon width="16px" height="16px" />}
          size="sm"
          variant="ghost"
          color="text-secondary"
          _hover={{color: 'text-primary', bg: 'fill-gray'}}
        />
        <MenuList
          borderRadius="12px"
          border="1px solid"
          borderColor="border-gray"
          shadow="sm"
          p="8px"
          w="216px"
        >
          <MenuItem
            icon={<EditIcon width="16px" height="16px" />}
            onClick={handleEdit}
            _hover={{bg: 'fill-gray'}}
          >
            {t('todo.actions.edit')}
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon width="16px" height="16px" />}
            onClick={handleDelete}
            _hover={{bg: 'fill-gray'}}
          >
            {t('todo.actions.delete')}
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
