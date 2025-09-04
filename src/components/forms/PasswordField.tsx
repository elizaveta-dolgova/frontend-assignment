import {FormTextField, InputFieldProps} from './FormTextField';
import {useState} from 'react';
import {HideIcon, ShowIcon} from '../icons';
import {useTranslation} from 'react-i18next';
import {IconButton} from '@chakra-ui/react';

export function PasswordField(props: InputFieldProps) {
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormTextField
      {...props}
      multiLine={false}
      type={showPassword ? 'text' : 'password'}
      rightElement={
        <IconButton
          type="button"
          size="sm"
          variant="ghost"
          aria-label={
            showPassword ? t('todo.actions.hidePassword') : t('todo.actions.showPassword')
          }
          onClick={togglePasswordVisibility}
          icon={
            showPassword ? (
              <HideIcon width="16px" height="16px" />
            ) : (
              <ShowIcon width="16px" height="16px" />
            )
          }
        />
      }
    />
  );
}
