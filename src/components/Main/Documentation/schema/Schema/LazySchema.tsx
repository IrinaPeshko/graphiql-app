import Preloader from '@/components/Preloader/Preloader';
import { ISchemaType } from '@/types/general';
import { Suspense, lazy } from 'react';

const Schema = lazy(() => import('./Schema'));

interface ILazySchemaProps {
  types: ISchemaType[];
}

function LazySchema({ types }: ILazySchemaProps) {
  return (
    <Suspense fallback={<Preloader view="mini" />}>
      <Schema types={types} />
    </Suspense>
  );
}

export default LazySchema;
