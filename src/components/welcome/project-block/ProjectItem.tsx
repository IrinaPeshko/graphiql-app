import s from './project-item.module.scss';
import { IWelcomeProps } from '../../../types/general';
import { useInView } from 'react-intersection-observer';

export default function ProjectItem({
  name,
  description,
  uniqueKey,
}: IWelcomeProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <div className={s.projectItem} key={uniqueKey}>
      <h3
        className={`${s.itemHeader} ${inView ? s.itemHeaderVisible : ''}`}
        ref={ref}
      >
        {name}
      </h3>
      <p className={s.itemContent}>{description}</p>
    </div>
  );
}
