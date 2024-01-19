import s from './not-found.module.scss';
import { Link } from 'react-router-dom';
import notFoundImg from '@assets/not-found.png';

export default function NotFound() {
  return (
    <div className={`conteiner ${s.notFoundBlock}`} data-testid="not-found">
      <div>
        <img className={s.image} src={notFoundImg} alt="not found" />
        <h1 className={s.header}>Oops! That page can’t be found.</h1>
        <Link to="/" className={s.link}>
          Go to the home page →
        </Link>
      </div>
    </div>
  );
}
