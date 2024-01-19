import { useContext, useEffect, useRef, useState } from 'react';
import s from './selectLang.module.scss';
import arrow from '@/assets/211687_down_arrow_icon.svg';
import ru from '/header/ru.png';
import en from '/header/en.png';
import { LangContext, LangContextType } from '@/providers/LangProvider';

const langs: { lang: LangContextType; img: string }[] = [
  { lang: 'ru', img: ru },
  { lang: 'en', img: en },
];

export default function SelectLang() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang } = useContext(LangContext);
  const langRef = useRef<HTMLDivElement>(null);

  const LangList = langs.map((el) => (
    <li
      className={s.langItem}
      key={el.lang}
      id={el.lang}
      data-testid={`selectLang-${el.lang}`}
      onClick={() => {
        if (!setLang) return;
        setLang(() => el.lang);
        setIsLangOpen(false);
        localStorage.setItem('lang', el.lang);
      }}
    >
      <p className={`${s.langName} ${lang === el.lang ? s.current : ''}`}>
        {el.lang.toUpperCase()}
      </p>
      <img src={el.img} alt={`${el.lang} language`} className={s.langFlag} />
    </li>
  ));

  const handleClickOutside = (event: MouseEvent) => {
    if (
      langRef.current &&
      event.target instanceof Node &&
      !langRef.current.contains(event.target)
    ) {
      setIsLangOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={s.lang} ref={langRef}>
      <div
        className={s.value}
        onClick={() => setIsLangOpen(!isLangOpen)}
        data-testid="select-lang"
      >
        {lang === 'ru' ? (
          <img src={ru} alt={`russian language`} className={s.flag} />
        ) : (
          <img src={en} alt={`english language`} className={s.flag} />
        )}

        <span className={`${s.arrow} ${isLangOpen ? s.active : ''}`}>
          <img src={arrow} width={10} alt="arrow" />
        </span>
      </div>

      {isLangOpen && <ul className={s.langList}>{LangList}</ul>}
    </div>
  );
}
