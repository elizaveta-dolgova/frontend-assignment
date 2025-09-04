import {useTranslation} from 'react-i18next';
import {AuthForm} from '../components/forms/AuthForm';
import {useRegisterMutation} from '../api/login/mutations';
import {getErrorMessage} from '../utils/getErrorMessage';
import {UserCredentials} from '../api/client';

export const RegisterPage = () => {
  const {t} = useTranslation();
  const {mutateAsync: register, error} = useRegisterMutation();

  const handleSubmit = async (data: UserCredentials) => {
    try {
      await register(data);
    } catch (error) {}
  };

  return (
    <AuthForm
      title={t('auth.register.title')}
      description={t('auth.login.description')}
      submitButtonText={t('auth.register.submitButton')}
      alternativeText={t('auth.register.alternativeText')}
      alternativeLink="/login"
      alternativeLinkText={t('auth.register.alternativeLink')}
      onSubmit={handleSubmit}
      error={getErrorMessage(error, t('auth.register.error'))}
    />
  );
};
