import s from './preloader.module.scss';
import PreloaderIco from '@assets/loading.svg?react';

interface IProps {
  view: 'full' | 'mini';
}

export default function Preloader({ view }: IProps) {
  if (view === 'full') {
    return (
      <div className={`${s.preloader_full}`} data-testid="preloader-full">
        <span className={s.preloader__ico}></span>
      </div>
    );
  } else if (view === 'mini') {
    return (
      <div className={`${s.preloader_mini}`}>
        <PreloaderIco height={30} className={s.preloader__ico} />
      </div>
    );
  }
}
