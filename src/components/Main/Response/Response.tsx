import styles from './response.module.scss';
import 'allotment/dist/style.css';
import { useAppSelector } from '@/store/store';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { langs } from '@uiw/codemirror-extensions-langs';
import Editor from '../Editor/Editor';
import { useContext } from 'react';
import { LangContext } from '@/providers/LangProvider';

function Response() {
  const { lang } = useContext(LangContext);
  const activeTab = useAppSelector((store) => store.tabs.activeTab);
  const response = useAppSelector(
    (store) => store.tabs.tabs[activeTab].responseContent
  );
  const isMakingRequest = useAppSelector(
    (state) => state.editor.isMakingRequest
  );

  const basicSetup = {
    highlightActiveLine: false,
    foldGutter: false,
    lineNumbers: false,
  };

  return (
    <div className={`${styles.responseContainer} ${styles.container}`}>
      <span className={styles.title}>
        {lang === 'ru' ? 'Ответ' : 'Response'}
      </span>
      <Editor
        editable={false}
        readOnly={true}
        theme={tokyoNightDay}
        value={isMakingRequest ? '...' : response}
        extensions={[langs.json()]}
        basicSetup={basicSetup}
      />
    </div>
  );
}

export default Response;
