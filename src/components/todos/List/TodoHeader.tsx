import {Heading, HStack, VStack, Text, Button} from '@chakra-ui/react';
import {formatCzechDate} from '../../../utils/dateFormatter';
import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';

export function TodoHeader() {
  const {t} = useTranslation();
  return (
    <HStack justify="space-between" align="flex-start" w="full" mb="8px">
      <VStack align="flex-start">
        <Heading fontSize="heading.3">Hello, John Doe</Heading>
        <Text fontSize="text.base" color="text-secondary">
          {formatCzechDate(new Date())}
        </Text>
      </VStack>
      <Button as={Link} to="/todos/create" colorScheme="blue">
        {t('todo.addTask')}
      </Button>
    </HStack>
  );
}
