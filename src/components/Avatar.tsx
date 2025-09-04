import {Avatar as ChakraAvatar, HStack, Text} from '@chakra-ui/react';
import {useAuthStore} from '../store/useAuthStore';

interface AvatarProps {
  name: string;
  src?: string;
}

export const Avatar = ({name, src}: AvatarProps) => {
  const {logout} = useAuthStore((s) => s.actions);

  return (
    <HStack spacing="2" alignItems="center">
      <ChakraAvatar
        as="button"
        title="Logout"
        src={src}
        size="xs"
        width="24px"
        height="24px"
        bg="gray.400"
        onClick={logout}
      />
      <Text fontSize="text.base" fontWeight="text.base" color="text-primary">
        {name}
      </Text>
    </HStack>
  );
};
