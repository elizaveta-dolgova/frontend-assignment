import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Textarea,
  InputProps,
} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

type BaseProps = {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  multiLine?: boolean;
  error?: string;
  isRequired?: boolean;
  rightElement?: ReactNode;
};

export type InputFieldProps = BaseProps & {
  multiLine?: false;
  type?: InputProps['type'];
};

type TextareaFieldProps = BaseProps & {
  multiLine: true;
};

export type FormTextFieldProps = InputFieldProps | TextareaFieldProps;

export const FormTextField = (props: FormTextFieldProps) => {
  const {label, name, register, error, rightElement, multiLine, isRequired = false} = props;
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {multiLine ? (
          <Textarea id={name} {...register} />
        ) : (
          <Input id={name} {...register} type={props.type ?? 'text'} />
        )}
        <InputRightElement>{rightElement}</InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
