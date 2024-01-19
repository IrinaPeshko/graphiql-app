import s from './welcome-block.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebase';
import { useContext } from 'react';
import { LangContext } from '@/providers/LangProvider';
import { Link } from 'react-router-dom';
import MoonIco from '@assets/pngwing.com (23).png';
import { ThemeContext } from '@/providers/ThemeProvider';
import { authBtn } from '@/components/Header/Header';

const welcomeData = {
  header: {
    ru: 'Приложение для твоих запросов',
    en: 'Application for your queries',
  },
  authNav: {
    title: {
      en: 'To use the application, go to HOME page',
      ru: 'Чтобы использовать приложение, перейди на ГЛАВНУЮ страницу',
    },
    button: {
      en: 'Main',
      ru: 'Главная',
    },
  },
  noAuthNav: {
    title: {
      en: 'To use the application, sign up or sign in to your account',
      ru: 'Чтобы использовать приложение, зарегистрируйтесь или войдите в свою учетную запись',
    },
  },
};

export default function WelcomeBlock() {
  const [user] = useAuthState(auth);
  const { lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={s.welcomeBlock} data-testid="welcome-block">
      <div className={s.imageBlock}>
        <img
          className={`${s.image} ${s.image_earth} ${
            theme === 'light' ? s.active : ''
          }`}
          src={'./welcomePage/earth.png'}
          alt="night"
        />
        <img
          className={`${s.image} ${s.image_moon}`}
          src={MoonIco}
          alt="moon"
        />
      </div>

      <div className={s.welcomeContent}>
        <h1 className={`logo_name ${s.title}`}>GraphiQL</h1>
        <h2 className={s.header}>{welcomeData.header[lang]}</h2>
        {user ? (
          <>
            <h3 className={s.header}>{welcomeData.authNav.title[lang]}</h3>
            <div className={s.nav}>
              <Link className="link" to={'/'}>
                {welcomeData.authNav.button[lang]}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className={s.header}>{welcomeData.noAuthNav.title[lang]}</h3>
            <div className={s.nav}>
              {authBtn.map((el) => (
                <Link className="link" to={el.to} key={el.title.en}>
                  {el.title[lang]}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
