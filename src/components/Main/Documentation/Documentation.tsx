import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import styles from './documentation..module.scss';
import { getSchemaTypes } from '@/utils/graphqlSchema';
import { ISchemaType } from '@/types/general';
import { useAppSelector } from '@/store/store';
import { useDeferredValue } from 'react';

function Documentation() {
  const [isLoading, setIsLoading] = useState(true);
  const types = useRef<ISchemaType[]>([]);
  const prevUrl = useRef<string>('');
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const isDocOpen = useAppSelector((state) => state.editor.isDocOpen);
  const Schema = lazy(() => import('./schema/Schema/Schema'));

  useEffect(() => {
    async function getAllTypes() {
      setIsLoading(true);
      if (!isDocOpen || tabs[activeTab].url === '') {
        return;
      }
      if (tabs[activeTab].url !== prevUrl.current) {
        types.current = await getSchemaTypes(tabs[activeTab].url);
        prevUrl.current = tabs[activeTab].url;
      }
      setIsLoading(false);
    }
    getAllTypes();
  }, [isDocOpen, tabs[activeTab].url]);
  const deferredTypes = useDeferredValue(types.current);


  return (
    <div className={`${styles.docDescription} ${styles.container}`}>
      <Suspense fallback={<div>Loading...</div>}>
        {isLoading ? <div>Loading...</div> : <Schema types={deferredTypes} />}
      </Suspense>
    </div>
  );
}

export default Documentation;
