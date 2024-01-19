import { useContext, useState } from 'react';
import Details from '../Details/Details';
import Navigation from '../Navigation/Navigation';
import { IDataItem, ISchemaType } from '@/types/general';
import DocList from '../DocList/DocList';
import styles from './schema.module.scss';
import React from 'react';
import { LangContext } from '@/providers/LangProvider';

interface ISchemaProps {
  types: ISchemaType[];
}

const Schema = React.memo(({ types }: ISchemaProps) => {
  const { lang } = useContext(LangContext);
  const [data, setData] = useState<IDataItem[]>([]);
  const field = data[data.length - 1];

  const filteredTypes = types
  .filter((item) =>
    item.name === 'Query' ||
    item.name === 'Root' ||
    item.name === 'Mutation' ||
    item.name === 'Subscription' ||
    /query/i.test(item.name)
  )
    .sort((a, b) => {
      if (a.name === 'Query' || a.name === 'Root') return -1;
      if (b.name === 'Query' || b.name === 'Root') return 1;
      if (a.name === 'Mutation') return -1;
      if (b.name === 'Mutation') return 1;
      return 0;
    });

  const selectedField = filteredTypes
    .flatMap((item) => item.fields)
    .find((item) => item.name === field?.name);

  const selectedType = types.find((item) => item.name === String(field?.type));

  return (
    <div>
      {selectedType ? (
        <>
          <Navigation data={data} setData={setData} />
          <Details data={selectedField} type={selectedType} setData={setData} />
        </>
      ) : (
        <>
          <span className={styles.title}>
            {lang === 'ru' ? 'Документация' : 'Documentation'}
          </span>
          <p className={styles.docText}>
            {lang === 'ru'
              ? 'Схема GraphQL предоставляет корневой тип для каждого типа операций.'
              : 'A GraphQL schema provides a root type for each kind of operation.'}
          </p>
          {filteredTypes.map((item, index) => (
            <DocList
              key={`${item.name}-${index}`}
              title={item.name.toLocaleUpperCase()}
              data={item.fields}
              setData={setData}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default Schema;
