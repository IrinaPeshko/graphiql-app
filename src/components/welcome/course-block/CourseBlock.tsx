import { useContext } from 'react';
import s from './course-block.module.scss';
import { LangContext } from '@/providers/LangProvider';

const courseData = {
  header: {
    en: 'RS School React course',
    ru: 'RS School React курс',
  },
  about: {
    en: 'RS School is free-of-charge and community-based education program.',
    ru: 'RS School — это бесплатная образовательная программа, ориентированная на сообщество.',
  },
  features: {
    title: {
      en: 'What to expect:',
      ru: 'Что ожидать:',
    },
    list: {
      en: [
        'Practical Learning',
        'Collaborative Environment',
        'Cutting-edge Technologies',
        'Project-based Approach',
        'Mentorship',
        'Portfolio Building',
      ],
      ru: [
        'Практическое обучение',
        'Среда для совместной работы',
        'Передовые технологии',
        'Проектный подход',
        'Наставничество',
        'Формирование портфолио',
      ],
    },
  },
};

export default function CourseBlock() {
  const { lang } = useContext(LangContext);

  return (
    <div className={s.courseBlock} data-testid="course-block">
      <div className="conteiner">
        <h2 className={s.header}>{courseData.header[lang]}</h2>
        <h3 className={s.about}>{courseData.about[lang]}</h3>
        <div className={s.course_features}>
          <h2 className={s.course_features__title}>
            {courseData.features.title[lang]}
          </h2>
          <ul>
            {courseData.features.list[lang].map((el, i) => (
              <li className={s.features_item} key={`features_${i}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
