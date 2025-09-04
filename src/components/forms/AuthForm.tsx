import {Button, VStack, Text, Link, Alert, AlertIcon} from '@chakra-ui/react';
import {FormTextField} from './FormTextField';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {UserCredentials} from '../../api/client';
import {AuthFormWrapper} from './AuthFormWrapper';
import {Link as RouterLink} from 'react-router';
import {PasswordField} from './PasswordField';

type Props = {
  title: string;
  description: string;
  submitButtonText: string;
  alternativeText: string;
  alternativeLink: string;
  alternativeLinkText: string;
  onSubmit: (data: UserCredentials) => Promise<void> | void;
  error?: string | null;
};

export function AuthForm({
  title,
  description,
  submitButtonText,
  alternativeText,
  alternativeLink,
  alternativeLinkText,
  onSubmit,
  error,
}: Props) {
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<UserCredentials>({
    reValidateMode: 'onChange',
  });

  return (
    <AuthFormWrapper title={title} description={description}>
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} w="full" noValidate spacing={4}>
        <FormTextField
          label={t('auth.fields.username')}
          name="username"
          register={register('username', {
            required: t('auth.validation.usernameRequired'),
            minLength: {
              value: 3,
              message: t('auth.validation.usernameMinLength'),
            },
          })}
          error={errors.username?.message}
          isRequired
        />

        <PasswordField
          label={t('auth.fields.password')}
          name="password"
          register={register('password', {
            required: t('auth.validation.passwordRequired'),
          })}
          error={errors.password?.message}
          isRequired
        />

        <Button type="submit" w="full" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </VStack>
      <Text textAlign="center" color="text-secondary" textStyle="text.base">
        {alternativeText}{' '}
        <Link as={RouterLink} to={alternativeLink} color="fill-brand" fontWeight="text.alternative">
          {alternativeLinkText}
        </Link>
      </Text>
    </AuthFormWrapper>
  );
}
