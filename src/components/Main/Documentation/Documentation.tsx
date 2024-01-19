import { useEffect, useRef, useState } from 'react';
import styles from './documentation.module.scss';
import { getSchemaTypes } from '@/utils/graphqlSchema';
import { ISchemaType } from '@/types/general';
import { useAppSelector } from '@/store/store';
import { useDeferredValue } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import LazySchema from './schema/Schema/LazySchema';
import Modal from '@/components/Modal/Modal';

function Documentation() {
  const [isLoading, setIsLoading] = useState(true);
  const types = useRef<ISchemaType[]>([]);
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const isDocOpen = useAppSelector((state) => state.editor.isDocOpen);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getAllTypes() {
      setIsLoading(true);
      setErrorMessage('');

      if (!isDocOpen || tabs[activeTab].url === '') {
        return;
      }

      try {
        types.current = await getSchemaTypes(tabs[activeTab].url);
        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(true);
        types.current = [];
        setErrorMessage(error instanceof Error ? error.message : 'Error');
      }
    }

    getAllTypes();
  }, [isDocOpen, tabs[activeTab].url]);

  const deferredTypes = useDeferredValue(types.current);

  return (
    <div
      className={`${styles.docDescription} ${styles.container}`}
      data-testid="documentation"
    >
      {isLoading ? (
        <Preloader view="mini" />
      ) : (
        <LazySchema types={deferredTypes} />
      )}
      {errorMessage ? <Modal errorMessage={errorMessage} /> : null}
    </div>
  );
}

export default Documentation;
