import styles from './query.module.scss';
import ArrowIcon from '../../../assets/211687_down_arrow_icon.svg?react';
import 'allotment/dist/style.css';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  setQueryIsOpen,
  setQuerySectionSize,
} from '../../../store/reducers/editorSlice';
import { useContext, useEffect, useState } from 'react';
import { updateTabContent } from '../../../store/reducers/tabSlice';
import { variablesTemplate } from './variablesTemplate';
import { headersTemplate } from './headersTemplate';
import Editor from '../Editor/Editor';
import { LangContext } from '@/providers/LangProvider';

function Query() {
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const querySectionSize = useAppSelector(
    (state) => state.editor.querySectionSize
  );
  const isOpen = useAppSelector((state) => state.editor.isQueryOpen);
  const variablesContent = tabs[activeTab]?.variablesContent;
  const headersContent = tabs[activeTab]?.headersContent;
  const [isActive, setIsActive] = useState(0);

  const handleVariablesClick = () => {
    setIsActive(0);
  };

  const handleHeadersClick = () => {
    setIsActive(1);
  };

  const handleArrowIconClick = () => {
    dispatch(setQueryIsOpen(!isOpen));
    dispatch(setQuerySectionSize(querySectionSize === 150 ? 50 : 150));
  };

  const handleContentChange = (content?: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[activeTab] = {
      ...updatedTabs[activeTab],
      [isActive === 0 ? 'variablesContent' : 'headersContent']: content,
    };
    dispatch(updateTabContent(updatedTabs[activeTab]));
  };

  useEffect(() => {
    if (tabs.length === 1) {
      const updatedTabs = [...tabs];
      updatedTabs[activeTab] = {
        ...updatedTabs[activeTab],
        variablesContent: variablesTemplate,
        headersContent: headersTemplate,
      };
      dispatch(updateTabContent(updatedTabs[activeTab]));
    }
  }, []);

  return (
    <div className={`${styles.queryContainer} ${styles.container}`}>
      <div className={styles.queryButtons}>
        <div className={styles.queryButtonsTitle}>
          <button
            className={`${styles.queryButton} ${
              isActive === 0 ? styles.queryButtonActive : ''
            }`}
            onClick={handleVariablesClick}
          >
            {lang === 'ru' ? 'Переменные' : 'Variables'}
          </button>
          <button
            className={`${styles.queryButton} ${
              isActive === 1 ? styles.queryButtonActive : ''
            }`}
            onClick={handleHeadersClick}
          >
            {lang === 'ru' ? 'Заголовки' : 'Headers'}
          </button>
        </div>
        <button className={styles.arrowButton} onClick={handleArrowIconClick}>
          <ArrowIcon
            className={`${styles.arrowIcon} ${
              isOpen ? styles.rotatedArrow : ''
            }`}
          />
        </button>
      </div>
      <div className={styles.queryEditor}>
        {isActive === 0 ? (
          <Editor
            readOnly={false}
            theme={bbedit}
            editable={true}
            value={variablesContent}
            onChange={handleContentChange}
          />
        ) : (
          <Editor
            readOnly={false}
            theme={bbedit}
            editable={true}
            value={headersContent}
            onChange={handleContentChange}
          />
        )}
      </div>
    </div>
  );
}

export default Query;
