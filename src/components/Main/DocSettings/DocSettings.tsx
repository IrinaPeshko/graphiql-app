import styles from './DocSettings.module.scss';
import DocIcon from '../../../assets/book.svg?react';
import { setDocIsOpen } from '../../../store/reducers/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useContext } from 'react';
import { LangContext } from '@/providers/LangProvider';

function DocSettings() {
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.editor.isDocOpen);
  const handleDocIconClick = () => {
    dispatch(setDocIsOpen(!isOpen));
  };

  return (
    <div className={`${styles.docContainer} ${styles.container}`}>
      <button
        className={styles.docButton}
        onClick={handleDocIconClick}
        title={
          lang === 'ru'
            ? 'Показать проводник документации'
            : 'Show Documentation Explorer'
        }
      >
        <DocIcon className={styles.docIcon} />
      </button>
    </div>
  );
}

export default DocSettings;
