import { IDataItem, IType } from '@/types/general';
import styles from './DocList.module.scss';
import { getFieldType } from '@/utils/getFieldType';
import { getTypeName } from '@/utils/getTypeName';

interface IDocListProps {
  data: IDataItem[];
  setData: React.Dispatch<React.SetStateAction<IDataItem[]>>;
  title: string;
}

function DocList({ data, setData, title }: IDocListProps) {
  const handleItemClick = (item: IDataItem) => {
    const typeName = getTypeName(item.type as IType);
    const newDataItem: IDataItem = {
      name: item.name,
      type: typeName,
    } as IDataItem;
    setData((prevData: IDataItem[]) => [...prevData, newDataItem]);
  };

  return (
    <>
      <div className={styles.docText}>{title}</div>
      <ul>
        {data.map((dataItem) => {
          const { name } = dataItem;
          const type = getFieldType(dataItem.type as IType);

          if (name && type) {
            return (
              <li
                key={`${name}-${type}`}
                onClick={() => handleItemClick(dataItem)}
                className={styles.fieldBlock}
              >
                <span className={styles.field}>{name}</span>
                <span>: </span>
                <span className={styles.type}>{type}</span>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default DocList;
