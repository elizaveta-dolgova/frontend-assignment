import {Heading, Text, Button, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';

export function NotFound() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <VStack spacing={6} pt="100px">
      <VStack spacing={3} alignItems="center" justifyContent="center" maxW="md">
        <Heading size="2xl">{t('notFound.code')}</Heading>
        <Heading size="lg">{t('notFound.title')}</Heading>
        <Text textAlign="center">{t('notFound.description')}</Text>
      </VStack>
      <Button colorScheme="blue" size="lg" onClick={() => navigate('/')}>
        {t('notFound.goHome')}
      </Button>
    </VStack>
  );
}
