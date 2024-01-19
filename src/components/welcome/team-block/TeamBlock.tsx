import { useContext } from 'react';
import TeamMember from './TeamMember';
import s from './team-block.module.scss';
import { LangContext } from '@/providers/LangProvider';

export default function TeamBlock() {
  const { lang } = useContext(LangContext);

  return (
    <div className={s.team}>
      <h2 className={s.teamHeader}>{title[lang]}</h2>
      {team.map((el, i) => {
        return (
          <TeamMember
            img={el.name.en}
            name={el.name[lang]}
            description={el.description[lang]}
            uniqueKey={i}
            key={i}
          />
        );
      })}
    </div>
  );
}

const title = {
  en: 'Development team',
  ru: 'Команда разработчиков',
};

const team = [
  {
    name: {
      en: 'Irina',
      ru: 'Ирина',
    },
    description: {
      en: 'Her passion for aesthetics brings a touch of elegance to the user experience, turning every interaction into a visual journey.',
      ru: 'Её страсть к эстетике придает штрих элегантности пользовательскому опыту, превращая каждое взаимодействие в визуальное путешествие.',
    },
  },
  {
    name: {
      en: 'Mariya',
      ru: 'Мария',
    },
    description: {
      en: 'Her empathetic approach creates a safe environment for users and every authentication will be a warm welcome, creating a sense of belonging.',
      ru: 'Её чуткость идет в ногу с созданием безопасного пространства для пользователей, а каждое подтверждение личности превращается в теплую встречу.',
    },
  },
  {
    name: {
      en: 'Anastasia',
      ru: 'Анастасия',
    },
    description: {
      en: 'Her insatiable curiosity allows her to travel across vast landscapes GraphQL, turning data queries into exciting adventures.',
      ru: 'Её неутолимое любопытство позволяет ей путешествовать по просторам разнообразных ландшафтов GraphQL, превращает запросы данных в захватывающие приключения.',
    },
  },
];
