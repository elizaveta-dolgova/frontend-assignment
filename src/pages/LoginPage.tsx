import {useTranslation} from 'react-i18next';
import {AuthForm} from '../components/forms/AuthForm';
import {useLoginMutation} from '../api/login/mutations';
import {UserCredentials} from '../api/client';

export const LoginPage = () => {
  const {t} = useTranslation();

  const {mutateAsync: login, error} = useLoginMutation();

  const handleSubmit = async (data: UserCredentials) => {
    try {
      await login(data);
    } catch (error) {}
  };

  return (
    <AuthForm
      title={t('auth.login.title')}
      description={t('auth.login.description')}
      submitButtonText={t('auth.login.submitButton')}
      alternativeText={t('auth.login.alternativeText')}
      alternativeLink="/register"
      alternativeLinkText={t('auth.login.alternativeLink')}
      onSubmit={handleSubmit}
      error={error && (error?.message || t('auth.login.error'))}
    />
  );
};
