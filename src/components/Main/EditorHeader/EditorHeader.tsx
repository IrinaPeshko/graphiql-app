import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './EditorHeader.module.scss';
import { updateTabContent } from '@/store/reducers/tabSlice';
import { useContext, useEffect, useState } from 'react';
import CopyIcon from '@/assets/copy_icon_128895.svg?react';
import { apiExamples } from '@/utils/apiExamples';
import { LangContext } from '@/providers/LangProvider';

function EditorHeader() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const [showApiList, setShowApiList] = useState(false);
  const { lang } = useContext(LangContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newURL = event.target.value;
    dispatch(
      updateTabContent({
        url: newURL,
      })
    );
  };

  const handleQuestionButtonClick = () => {
    setShowApiList(!showApiList);
  };

  useEffect(() => {
    if (tabs.length === 1 && tabs[0].url === '') {
      dispatch(
        updateTabContent({
          url: apiExamples[0].url,
        })
      );
    }
  }, [tabs, dispatch]);

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    setShowApiList(false);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.questionButton}
        onClick={handleQuestionButtonClick}
      >
        ?
      </button>
      <input
        type="text"
        value={tabs[activeTab]?.url}
        onChange={handleInputChange}
        placeholder={
          lang === 'ru'
            ? 'Введите URL-адрес API с поддержкой CORS'
            : 'Enter CORS-enabled API URL'
        }
      />
      {showApiList && (
        <div className={styles.apiList}>
          <ul>
            <li>{lang === 'ru' ? 'Примеры API:' : 'API examples:'}</li>
            {apiExamples.map((api, index) => (
              <li key={index}>
                <span>{api.url}</span>
                <button
                  className={styles.copyButton}
                  onClick={() => copyText(api.url)}
                  title={lang === 'ru' ? 'Скопировать' : 'Copy'}
                >
                  <CopyIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EditorHeader;
