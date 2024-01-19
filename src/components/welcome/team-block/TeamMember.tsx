import { useInView } from 'react-intersection-observer';
import s from './team-member.module.scss';
import { IWelcomeProps } from '../../../types/general';

export default function TeamMember({
  img,
  name,
  description,
  uniqueKey,
}: IWelcomeProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });
  return (
    <div
      ref={ref}
      key={uniqueKey}
      className={`${s.member_block} ${s.fadeIn} ${inView ? s.visible : ''}`}
    >
      <div className={s.member}>
        <div className={s.member_photo}>
          <img
            className={s.photo}
            src={`./welcomePage/${img}.jpg`}
            alt={`${name}'s photo`}
          />
        </div>
        <div className={s.member_content}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
