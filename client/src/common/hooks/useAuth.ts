import { useAppSelector } from '../../redux/hook';
import { authSelector } from '../../redux/slices/auth.slice';
import { emptyAvatarUrl } from '../constants/index.constant';

export const useAuth = () => {
  const { isLoading, user } = useAppSelector(authSelector);
  const avatarUrl = user?.avatar?.url || emptyAvatarUrl

  return { isLoading, user , avatarUrl};
};
