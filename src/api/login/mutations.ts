import {useMutation} from '@tanstack/react-query';
import {api, AuthTokens} from '../client';
import {setTokens} from '../../utils/tokenHelpers';
import {useAuthStore} from '../../store/useAuthStore';

export const useLoginMutation = () => {
  const {login} = useAuthStore((s) => s.actions);

  return useMutation({
    mutationFn: api.login,
    onSuccess: (tokens: AuthTokens) => {
      setTokens(tokens.accessToken, tokens.refreshToken);
      login();
    },
  });
};

export const useRegisterMutation = () => {
  const {login} = useAuthStore((s) => s.actions);

  return useMutation({
    mutationFn: api.register,
    onSuccess: (tokens: AuthTokens) => {
      setTokens(tokens.accessToken, tokens.refreshToken);
      login();
    },
  });
};
