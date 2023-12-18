import styles from './request.module.scss';
import 'allotment/dist/style.css';
import CodeMirror from '@uiw/react-codemirror';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import PlayIcon from '../../../assets/play.svg?react';
import PrettifyIcon from '../../../assets/prettify.svg?react';
import { requestTemplate } from './requestTemplate';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateTabContent } from '../../../store/reducers/tabSlice';
import { useEffect, useState } from 'react';
import { prettifying } from '@/utils/prettifying';
import { IRequest } from '@/types/general';
import { makeRequest } from '@/utils/makeRequest';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema, buildClientSchema } from 'graphql';
import { introspectionQuery } from '@/utils/fetchGraphQLSchema/graphqlIntrospectionQuery';

function Request() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const url = tabs[activeTab].url;
  const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);

  const handleNewTabContent = (content: string) => {
    dispatch(updateTabContent({ index: activeTab, requestContent: content }));
  };

  useEffect(() => {
    if (tabs.length === 1 && tabs[0].requestContent === '') {
      handleNewTabContent(requestTemplate);
    }
  }, [tabs, handleNewTabContent]);

  useEffect(() => {
    async function fetchGraphQLSchema(url: string) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: introspectionQuery }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseBody = await response.json();
        if (responseBody.errors) {
          console.error('GraphQL Errors:', responseBody.errors);
          throw new Error('GraphQL Errors');
        }
        const newSchema = buildClientSchema(responseBody.data)
        setSchema(newSchema);
      } catch (error) {
        console.error('Error fetching GraphQL schema:', error);
      }
    }
    if (url) {
      fetchGraphQLSchema(url);
    }
  }, [url]);

  const onPrettifyClick = (request: string) => {
    const response = prettifying(request);
    dispatch(updateTabContent({ index: activeTab, requestContent: response }));
  };

  const onPlayClick: (request: IRequest) => Promise<void> = async (request) => {
    const { query, url, variables, headers } = request;
    const trimHeaders = headers?.trim();
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
  };

  const extensions = schema ? [graphql(schema)] : [];
  return (
    <div className={`${styles.requestContainer} ${styles.container}`}>
      <span className={styles.title}>Request</span>
      <div className={styles.request}>
        <div className={styles.requestEditor}>
          <CodeMirror
            editable={true}
            value={tabs[activeTab]?.requestContent}
            theme={bbedit}
            onChange={handleNewTabContent}
            extensions={extensions}
          />
        </div>
        <div className={styles.requestButtons}>
          <button title="Execute Query">
            <PlayIcon
              className={styles.icon}
              onClick={() => {
                onPlayClick({
                  url: tabs[activeTab].url,
                  query: tabs[activeTab].requestContent,
                  variables: tabs[activeTab].variablesContent,
                  headers: tabs[activeTab].headersContent,
                });
              }}
            />
          </button>
          <button title="Prettify Query">
            <PrettifyIcon
              className={styles.icon}
              onClick={() => onPrettifyClick(tabs[activeTab]?.requestContent)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Request;
