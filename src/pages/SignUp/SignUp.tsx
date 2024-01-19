import { useContext, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { ErrorOption } from 'react-hook-form';
import { LangContext } from '@/providers/LangProvider';
import { AuthContext } from '@/providers/AuthProvider';

export default function SignUp() {
  const [errorAuthMessage, setErrorAuthMessage] = useState<
    | [
        name: 'email' | 'password' | 'root' | `root.${string}`,
        error: ErrorOption,
      ]
    | null
  >(null);
  const dispatch = useDispatch();
  const { isAuth } = useContext(AuthContext);

  const { lang } = useContext(LangContext);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorAuthMessage(() => null);
        const user = userCredential.user;
        dispatch(setUser(user.email));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorAuthMessage(() => [
            'email',
            {
              message:
                lang === 'ru'
                  ? `${email} уже используется существующим пользователем.`
                  : `${email} is already in use by an existing user.`,
              type: 'custom',
            },
          ]);
        } else {
          setErrorAuthMessage(() => [
            'email',
            {
              message:
                lang === 'ru'
                  ? `Что-то пошло не так. Проверьте все ли вы делаете правильно или обратитесь к разработчикам.`
                  : `Something was wrong. Check if you are doing everything correctly or contact the developers.`,
              type: 'custom',
            },
          ]);
        }
      });
  };

  return isAuth ? (
    <Navigate to="/" replace />
  ) : (
    <AuthForm
      title={lang === 'ru' ? 'Регистрация' : 'Sign up'}
      otherFormTitle={lang === 'ru' ? 'или войти' : 'or sing in using'}
      otherFormLink="/login"
      authFunk={signUp}
      errorAuthMessage={errorAuthMessage}
      lang={lang}
    />
  );
}
