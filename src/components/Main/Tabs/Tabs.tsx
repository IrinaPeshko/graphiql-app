import styles from './tabs.module.scss';
import CloseIcon from '../../../assets/close.svg?react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  addTab,
  deleteTab,
  setActiveTab,
} from '../../../store/reducers/tabSlice';
import { useContext } from 'react';
import { LangContext } from '@/providers/LangProvider';

function Tabs() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const { lang } = useContext(LangContext);

  const handleTabClick = (index: number) => {
    dispatch(setActiveTab(index));
  };

  const handleAddTab = () => {
    dispatch(
      addTab({
        requestContent: '',
        variablesContent: '',
        headersContent: '',
        url: '',
        responseContent: '',
      })
    );
    const newIndex = tabs.length;
    dispatch(setActiveTab(newIndex));
  };

  const handleDeleteTab = (index: number) => {
    dispatch(deleteTab(index));
  };

  return (
    <div className={styles.container}>
      {tabs.map((_, index) => (
        <div key={index} className={styles.tab}>
          <button
            className={`${styles.button} ${styles.tabButton} ${
              index === activeTab ? styles.active : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {lang === 'ru' ? 'Новая вкладка' : 'New Tab'}
          </button>
          {index > 0 && (
            <button
              className={styles.closeButton}
              onClick={() => handleDeleteTab(index)}
              title={lang === 'ru' ? 'Закрыть вкладку' : 'Close tab'}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      ))}
      <button
        className={`${styles.button} ${styles.add}`}
        onClick={handleAddTab}
        title={lang === 'ru' ? 'Добавить вкладку' : 'Add tab'}
      >
        +
      </button>
    </div>
  );
}

export default Tabs;
