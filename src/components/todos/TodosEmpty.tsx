import {Box, VStack, Heading, Text} from '@chakra-ui/react';
import {BigLogo} from '../icons';
import {useTranslation} from 'react-i18next';

export const TodosEmpty = () => {
  const {t} = useTranslation();

  return (
    <VStack spacing="24px" w="full">
      <Box position="relative">
        <BigLogo width="150px" height="130px" />
      </Box>

      <VStack spacing="12px">
        <Heading size="2" color="text-primary">
          {t('todo.empty.title')}
        </Heading>

        <Text color="text-secondary" fontSize="text.base">
          {t('todo.empty.description')}
        </Text>
      </VStack>
    </VStack>
  );
};
