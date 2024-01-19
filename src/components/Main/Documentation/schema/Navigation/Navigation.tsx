import { IDataItem } from '@/types/general';
import styles from './navigation.module.scss';
import cn from 'classnames';
import { useContext } from 'react';
import { LangContext } from '@/providers/LangProvider';

interface INavigationProps {
  data: IDataItem[];
  setData: React.Dispatch<React.SetStateAction<IDataItem[]>>;
}

function Navigation({ data, setData }: INavigationProps) {
  const { lang } = useContext(LangContext);
  const nav = [lang === 'ru' ? 'Документация' : 'Documentation'].concat(
    data.map((dataItem) => dataItem.name)
  );

  const handleClick = (name: string) => {
    const index = nav.indexOf(name) - 1;
    setData((prev) => prev.slice(0, index + 1));
  };

  return (
    <div className={styles.fieldBlock} data-testid="navigation">
      {nav.map((navItem, index) => {
        const isLastItem = index === nav.length - 1;
        const capitalizedNavItem =
          navItem.charAt(0).toUpperCase() + navItem.slice(1);
        const className = cn({
          [styles.active]: index === nav.length - 1,
          [styles.inactive]: index !== nav.length - 1,
        });

        return (
          <div
            key={`${navItem}-${index}`}
            onClick={() => handleClick(navItem)}
            className={className}
            role="navigation-item"
          >
            <span>{capitalizedNavItem}</span> {isLastItem ? '' : '→'}
          </div>
        );
      })}
    </div>
  );
}

export default Navigation;
