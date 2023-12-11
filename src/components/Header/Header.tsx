//  должен быть sticky. Момент, когда он становится sticky (если на странице есть прокрутка), следует анимировать: можно изменить цвет или уменьшить его высоту. Анимированный липкий заголовок
// Ссылка на страницу приветствия
// Элемент управления, позволяющий пользователю переключать язык
// Кнопка «Выход» — выход пользователя из системы.

import { Link } from 'react-router-dom';
import s from './header.module.scss';
import SwitchTheme from '../SwitchTheme/SwitchTheme';
import SelectLang from '../SelectLang/SelectLang';
import logo from '@assets/logo.svg';
import SignOut from '../SignOut/SignOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import AuthFalse from '../signButtons/AuthFalse';
import AuthTrue from '../signButtons/AuthTrue';

export default function Header() {

  const [user] = useAuthState(auth);

  return (
    <header>
      <div className={`${s.header} conteiner`}>
        <Link to='/welcome'>
          <div className={s.logo}>
            <img src={logo} alt="logo" width={50} />
          </div>
        </Link>
        <nav className={s.navigation}>
          {user ? <><AuthTrue /><SignOut /></> : <AuthFalse />}
          <SwitchTheme />
          <SelectLang />
        </nav>
      </div>
    </header>
  );
}
