import { IDataItem, ISchemaType } from '@/types/general';
import DocList from '../DocList/DocList';
import styles from './details.module.scss';

interface IDetailsProps {
  data: IDataItem | undefined;
  type: ISchemaType;
  setData: React.Dispatch<React.SetStateAction<IDataItem[]>>;
}

function Details({ data, type, setData }: IDetailsProps) {
  const { description, kind } = type;
  const types = type.fields || type.inputFields;
  const args = data && data.args;

  const renderDescription = () => {
    if (description || kind) {
      return (
        <div>
          {description && <div className={styles.docText}>DESCRIPTION</div>}
          {description && <div className={styles.docText}>{description}</div>}
          {kind && kind === 'SCALAR' && (
            <div className={styles.fieldBlock}>
              <span className={styles.field}>{kind.toLocaleLowerCase()}</span>
              <span> </span>
              <span className={styles.type}>{type.name}</span>
            </div>
          )}
          {kind && kind === 'ENUM' && (
            <>
              <span className={styles.field}>enum</span>{' '}
              <span className={styles.type}>{type.name}</span> &#123;
              <div className={styles.enumBlock}>
                {type.enumValues &&
                  type.enumValues.map((enumValue) => (
                    <div key={enumValue.name} className={styles.enumValue}>
                      {enumValue.name}
                    </div>
                  ))}
              </div>
              &#125;
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderDescription()}
      {types && types.length > 0 && (
        <DocList data={types} setData={setData} title="TYPE DETAILS" />
      )}
      {args && args.length > 0 && (
        <DocList data={args} setData={setData} title="ARGUMENTS" />
      )}
    </div>
  );
}

export default Details;
