import {useForm} from 'react-hook-form';
import {TodoRequest, TodoResponse} from '../../api/client';
import {Alert, AlertIcon, Button, Heading, HStack, IconButton, VStack} from '@chakra-ui/react';
import {FormTextField} from './FormTextField';
import {useNavigate} from 'react-router';
import {BackwardIcon, CheckIcon} from '../icons';
import {useTranslation} from 'react-i18next';

type Props = {
  title: string;
  submitButtonText: string;
  onSubmit: (data: TodoRequest) => Promise<void> | void;
  initialData?: TodoResponse;
  error?: string | null;
};

export function TodoForm({onSubmit, initialData, title, error, submitButtonText}: Props) {
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting, isDirty},
  } = useForm<TodoRequest>({
    defaultValues: initialData,
    reValidateMode: 'onChange',
  });
  const navigate = useNavigate();

  const handleFormSubmit = (data: TodoRequest) => {
    onSubmit(data);
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <>
      <HStack spacing={4} align="center">
        <IconButton
          icon={<BackwardIcon width="20px" height="20px" />}
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          aria-label={t('todo.actions.goBack')}
        />
        <Heading fontSize="heading.1" alignSelf="flex-start">
          {title}
        </Heading>
      </HStack>
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack as="form" onSubmit={handleSubmit(handleFormSubmit)} w="full" noValidate spacing={4}>
        <FormTextField
          label={t('todo.form.title')}
          name="username"
          register={register('title', {
            required: t('todo.form.required'),
          })}
          error={errors.title?.message}
          isRequired
        />
        <FormTextField
          label={t('todo.form.description')}
          name="description"
          register={register('description')}
          error={errors.description?.message}
          multiLine
        />
        <HStack justify="space-between" w="full">
          <Button type="button" onClick={handleDiscard} variant="secondary">
            {t('todo.form.discard')}
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<CheckIcon fill="white" />}
            disabled={!isDirty}
          >
            {submitButtonText}
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
