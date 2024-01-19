import styles from './request.module.scss';
import 'allotment/dist/style.css';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import PlayIcon from '../../../assets/play.svg?react';
import PrettifyIcon from '../../../assets/prettify.svg?react';
import { requestTemplate } from './requestTemplate';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateTabContent } from '../../../store/reducers/tabSlice';
import { useContext, useEffect, useState } from 'react';
import { prettifying } from '@/utils/prettifying';
import { IRequest } from '@/types/general';
import { makeRequest } from '@/utils/makeRequest';
import React from 'react';
import Editor from '../Editor/Editor';
import { LangContext } from '@/providers/LangProvider';
import Preloader from '@/components/Preloader/Preloader';
import { setIsMakingRequest } from '@/store/reducers/editorSlice';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { fetchGraphQLSchema } from '@/utils/fetchGraphQLSchema/fetchGraphQLSchema';

function Request() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const { lang } = useContext(LangContext);
  const isMakingRequest = useAppSelector(
    (state) => state.editor.isMakingRequest
  );
  const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);
  const url = tabs[activeTab].url;

  const handleNewTabContent = (content: string) => {
    dispatch(updateTabContent({ index: activeTab, requestContent: content }));
  };

  useEffect(() => {
    if (tabs.length === 1 && tabs[0].requestContent === '') {
      handleNewTabContent(requestTemplate);
    }
  }, [tabs, handleNewTabContent]);

  useEffect(() => {
    const getSchema = async (url: string) => {
      if (url) {
        const newSchema = await fetchGraphQLSchema(url);
        setSchema(newSchema);
      }
    };
    getSchema(url);
  }, [url]);

  const prettifyAndDispatch = (
    content: string,
    key: string,
    shouldSeparateWords: boolean
  ) => {
    const response = prettifying(content, shouldSeparateWords);
    dispatch(updateTabContent({ index: activeTab, [key]: response }));
  };

  const onPlayClick: (request: IRequest) => Promise<void> = async (request) => {
    dispatch(setIsMakingRequest(true));
    const { query, url, variables, headers } = request;
    const trimHeaders = headers?.trim();
    try {
      const headersObj: HeadersInit = trimHeaders
        ? JSON.parse(trimHeaders)
        : undefined;
      const res = await makeRequest({
        url,
        query,
        variables,
        headers: headersObj,
      });
      if (typeof res !== 'string') {
        const resStr = JSON.stringify(res, null, 2);
        dispatch(updateTabContent({ responseContent: resStr }));
      } else {
        dispatch(updateTabContent({ responseContent: res }));
      }
    } catch (err) {
      const errStr = `You have problem with headers in request:\n${err}`;
      dispatch(updateTabContent({ responseContent: errStr }));
    }

    dispatch(setIsMakingRequest(false));
  };

  const requestContent = React.useMemo(
    () => tabs[activeTab]?.requestContent,
    [tabs, activeTab]
  );

  const extensions = schema ? [graphql(schema)] : [];
  return (
    <div className={`${styles.requestContainer} ${styles.container}`}>
      <span className={styles.title}>
        {lang === 'ru' ? 'Запрос' : 'Request'}
      </span>
      <div className={styles.request}>
        <div className={styles.requestEditor}>
          <Editor
            editable={true}
            readOnly={false}
            value={requestContent}
            theme={bbedit}
            onChange={handleNewTabContent}
            extensions={extensions}
          />
        </div>
        <div className={styles.requestButtons}>
          <button
            title={lang === 'ru' ? 'Выполнить запрос' : 'Execute Query'}
            onClick={() => {
              onPlayClick({
                url: tabs[activeTab].url,
                query: tabs[activeTab].requestContent,
                variables: tabs[activeTab].variablesContent,
                headers: tabs[activeTab].headersContent,
              });
            }}
          >
            {isMakingRequest ? (
              <Preloader view={'mini'} />
            ) : (
              <PlayIcon className={styles.icon} />
            )}
          </button>
          <button
            title={lang === 'ru' ? 'Форматировать запрос' : 'Prettify Query'}
          >
            <PrettifyIcon
              className={styles.icon}
              onClick={() => {
                prettifyAndDispatch(
                  tabs[activeTab]?.requestContent,
                  'requestContent',
                  true
                );
                prettifyAndDispatch(
                  tabs[activeTab]?.variablesContent,
                  'variablesContent',
                  false
                );
                prettifyAndDispatch(
                  tabs[activeTab]?.headersContent,
                  'headersContent',
                  false
                );
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Request;
