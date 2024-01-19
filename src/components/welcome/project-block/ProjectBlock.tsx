import { useContext } from 'react';
import ProjectItem from './ProjectItem';
import s from './project-block.module.scss';
import { LangContext } from '@/providers/LangProvider';

export default function ProjectBlock() {
  const { lang } = useContext(LangContext);
  return (
    <div className={s.project}>
      <h2 className={s.header}>{title[lang]}</h2>
      <div className={s.projectItems}>
        {items.map((el, i) => {
          return (
            <ProjectItem
              name={el.name[lang]}
              description={el.description[lang]}
              uniqueKey={i}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

const title = {
  en: 'Our Project',
  ru: 'Наш проект',
};

const items = [
  {
    name: {
      en: 'Versatile GraphQL support',
      ru: 'Универсальная поддержка GraphQL',
    },
    description: {
      en: 'Our app opens doors to a myriad of GraphQL endpoints, offering users the flexibility to connect and query diverse data sources effortlessly.',
      ru: 'Наше приложение открывает двери для множества конечных точек GraphQL, предлагая пользователям возможность легко подключаться и запрашивать различные источники данных.',
    },
  },
  {
    name: {
      en: 'User-centric design',
      ru: 'Ориентированный на пользователя дизайн',
    },
    description: {
      en: 'Focused on creating an intuitive and visually pleasing experience, making GraphQL interactions enjoyable.',
      ru: 'Акцент на создании интуитивно понятного и визуально приятного приложения, делающего взаимодействие с GraphQL приятным.',
    },
  },
  {
    name: {
      en: 'Secure authentication',
      ru: 'Безопасная аутентификация',
    },
    description: {
      en: 'Implementing Firebase, we ensure a secure authentication process, building a foundation of trust for every user.',
      ru: 'Внедряя Firebase, мы обеспечиваем безопасный процесс аутентификации, создавая основу доверия для каждого пользователя.',
    },
  },
  {
    name: {
      en: 'Innovation unleashed',
      ru: 'Свобода инновациям',
    },
    description: {
      en: 'GraphiQL App represents a blend of cutting-edge technology and innovative design.',
      ru: 'Приложение GraphiQL представляет собой сочетание передовых технологий и инновационного дизайна.',
    },
  },
  {
    name: {
      en: 'Collaborative development',
      ru: 'Совместная разработка',
    },
    description: {
      en: 'Crafted by a dynamic team of developers—each contributing unique skills and perspectives—GraphiQL.',
      ru: 'GraphiQL создан динамичной командой разработчиков, каждый из которых обладает уникальными навыками и взглядами.',
    },
  },
];
