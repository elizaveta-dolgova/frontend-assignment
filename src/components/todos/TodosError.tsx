import {VStack, Heading, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {getErrorMessage} from '../../utils/getErrorMessage';

type Props = {
  error?: Error | string;
};

export const TodosError = ({error}: Props) => {
  const {t} = useTranslation();
  const errorMessage = getErrorMessage(error, t('todo.error.description'));

  return (
    <>
      <VStack spacing="12px">
        <Heading size="2" color="text-danger">
          {t('todo.error.title')}
        </Heading>

        <Text color="text-secondary" textAlign="center">
          {errorMessage}
        </Text>
      </VStack>
    </>
  );
};
