import { useContext, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ErrorOption } from 'react-hook-form';
import { auth } from '../../utils/firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { LangContext } from '@/providers/LangProvider';
import { AuthContext } from '@/providers/AuthProvider';

export default function Login() {
  const [errorAuthMessage, setErrorAuthMessage] = useState<
    | [
        name: 'email' | 'password' | 'root' | `root.${string}`,
        error: ErrorOption,
      ]
    | null
  >(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useContext(AuthContext);
  const { lang } = useContext(LangContext);

  const login = async (email: string, password: string) => {
    setErrorAuthMessage(() => null);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user.email));
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/too-many-requests') {
          setErrorAuthMessage(() => [
            'email',
            {
              message:
                lang === 'ru'
                  ? 'Количество запросов превышает максимально допустимое.'
                  : 'The number of requests exceeds the maximum allowed.',
              type: 'custom',
            },
          ]);
        } else if (error.code === 'auth/invalid-credential') {
          setErrorAuthMessage(() => [
            'email',
            {
              message:
                lang === 'ru'
                  ? 'Пожалуйста проверьте данные, которые вы ввели.'
                  : 'Please check the entered email or password.',
              type: 'custom',
            },
          ]);
        } else {
          setErrorAuthMessage(() => [
            'email',
            {
              message:
                lang === 'ru'
                  ? 'Что-то пошло не так. Проверьте все ли вы делаете правильно или обратитесь к разработчикам.'
                  : 'Something was wrong. Check if you are doing everything correctly or contact the developers.',
              type: 'custom',
            },
          ]);
          throw Error(error);
        }
      });
  };

  return isAuth ? (
    <Navigate to="/" replace />
  ) : (
    <AuthForm
      title={lang === 'ru' ? 'Вход' : 'Sign in'}
      otherFormTitle={
        lang === 'ru' ? 'или зарегистрироваться' : 'or sign up using'
      }
      otherFormLink="/register"
      authFunk={login}
      errorAuthMessage={errorAuthMessage}
      lang={lang}
    />
  );
}
