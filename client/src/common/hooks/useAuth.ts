import { useAppSelector } from '../../redux/hook';
import { authSelector } from '../../redux/slices/auth.slice';

export const useAuth = () => {
  const { isLoading, user } = useAppSelector(authSelector);

  return { isLoading, user };
};
