import styles from './main.module.scss';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { Allotment, AllotmentHandle } from 'allotment';
import 'allotment/dist/style.css';
import { useEffect, useRef, useState } from 'react';
import DocSettings from '../../components/Main/DocSettings/DocSettings';
import Documentation from '../../components/Main/Documentation/Documentation';
import Request from '../../components/Main/Request/Request';
import Query from '../../components/Main/Query/Query';
import Response from '../../components/Main/Response/Response';
import EditorHeader from '../../components/Main/EditorHeader/EditorHeader';
import Tabs from '../../components/Main/Tabs/Tabs';
import { useAppSelector } from '../../store/store';

function Main() {
  const [user, loading] = useAuthState(auth);
  const ref = useRef<AllotmentHandle>(null!);
  const isDocsOpen = useAppSelector((state) => state.editor.isDocOpen);
  const querySectionSize = useAppSelector(
    (state) => state.editor.querySectionSize
  );

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = width <= 768;

  return !user && !loading ? (
    <Navigate to="/welcome" replace />
  ) : (
    <div className={styles.mainContainer}>
      <Allotment vertical>
        <Allotment.Pane minSize={50} maxSize={50} preferredSize={'100%'}>
          <Tabs />
        </Allotment.Pane>
        <Allotment.Pane minSize={50} maxSize={50} preferredSize={'100%'}>
          <EditorHeader />
        </Allotment.Pane>
        <Allotment
          key={String(isMobile)}
          defaultSizes={isMobile ? [1, 4, 6, 3] : [1, 3, 4, 4]}
          minSize={50}
          vertical={isMobile}
        >
          <Allotment.Pane minSize={60} maxSize={60}>
            <DocSettings />
          </Allotment.Pane>
          <Allotment.Pane visible={isDocsOpen} minSize={200}>
            <Documentation />
          </Allotment.Pane>
          <Allotment.Pane minSize={300}>
            <Allotment
              key={querySectionSize}
              vertical
              defaultSizes={[100, 1]}
              ref={ref}
            >
              <Allotment.Pane minSize={50}>
                <Request />
              </Allotment.Pane>
              <Allotment.Pane minSize={querySectionSize}>
                <Query />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          <Allotment.Pane minSize={50}>
            <Response />
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </div>
  );
}

export default Main;
