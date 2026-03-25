import { useEffect } from 'react';
import { onAuthStateChange } from './authService';
import { loginSuccess, logout, setSessionChecked } from '../modules/auth/authSlice';
import { useAppDispatch } from '../hooks/useAppSelector';

const useAuthSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        dispatch(loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'Administrator',
        }));
      } else {
        dispatch(logout());
      }
      dispatch(setSessionChecked());
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthSession;