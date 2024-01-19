import { Link, NavLink } from 'react-router-dom';
import s from './header.module.scss';
import SwitchTheme from '../SwitchTheme/SwitchTheme';
import SelectLang from '../SelectLang/SelectLang';
import LogoIcon from '@assets/logo.svg?react';
import SignOut from '../SignOut/SignOut';
import { useContext, useEffect, useState } from 'react';
import { LangContext } from '@/providers/LangProvider';
import { AuthContext } from '@/providers/AuthProvider';

export const authBtn = [
  {
    title: {
      en: 'Sign In',
      ru: 'Вход',
    },
    to: '/login',
    auth: false,
  },
  {
    title: {
      en: 'Sign Up',
      ru: 'Регистрация',
    },
    to: '/register',
    auth: false,
  },
];

const nav = [
  {
    title: {
      en: 'Welcome',
      ru: 'Приветствие',
    },
    to: '/welcome',
    auth: null,
  },
  {
    title: { en: 'Main', ru: 'Главная' },
    to: '/',
    auth: true,
  },
  ...authBtn,
];

export default function Header() {
  const [fixHeader, setFixHeader] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { lang } = useContext(LangContext);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const scroll = () => {
      const top = window.scrollY;
      if (!fixHeader && !!top) setFixHeader(true);
      if (fixHeader && !top) setFixHeader(false);
    };
    window.addEventListener('scroll', scroll);
    return () => removeEventListener('scroll', scroll);
  });

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('lock');
    }
    return () => {
      document.body.classList.remove('lock');
    };
  }, [openMenu]);

  const navLinks = (
    isAuth
      ? nav.filter((el) => el.auth === true || el.auth === null)
      : nav.filter((el) => el.auth === false || el.auth === null)
  ).map((el, index) => (
    <NavLink key={`nav${index}`} className={`link ${s.nav_btn}`} to={el.to}>
      {el.title[lang]}
    </NavLink>
  ));

  return (
    <header
      className={`${fixHeader ? s.scroll : ''} ${openMenu ? s.open : ''}`}
    >
      <div className={`${s.header} conteiner ${fixHeader ? s.scroll : ''}`}>
        <Link to="/welcome">
          <div className={s.logo}>
            <LogoIcon width={50} />
            <span className="logo_name">GraphiQL</span>
          </div>
        </Link>

        <div className={s.menu}>
          <nav
            className={`${s.navigation} ${openMenu ? s.active : ''}`}
            onClick={() => setOpenMenu(false)}
          >
            <div
              className={`${s.nav_list} ${openMenu ? s.active : ''} ${
                fixHeader ? s.scroll : ''
              }`}
            >
              {navLinks}
              {isAuth ? (
                <SignOut title={lang === 'ru' ? 'Выход' : 'Sign out'} />
              ) : (
                ''
              )}
            </div>
          </nav>
          <div className={s.control}>
            <SwitchTheme />
            <SelectLang />
          </div>
          <div
            className={s.burger}
            onClick={() => setOpenMenu(() => !openMenu)}
          >
            <div
              className={`${s.burger_logo} ${openMenu ? `${s.active}` : ''}`}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
