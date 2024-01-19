import s from './footer.module.scss';
import RsLogo from '@/assets/rs_school.svg?react';
import GitHubLogo from '@assets/2993771_github_social media_icon.svg?react';

const gitHubData = [
  {
    name: 'Irina Peshko',
    link: 'https://github.com/IrinaPeshko',
  },
  {
    name: 'Anastasia Shishmareva',
    link: 'https://github.com/Nastasyma',
  },
  {
    name: 'Mariya Pyzh',
    link: 'https://github.com/maria-kashpur',
  },
];

export default function Footer() {
  return (
    <footer>
      <div className={`${s.footer} conteiner`}>
        <div>2024</div>

        <div className={s.contacts}>
          <GitHubLogo height={40} />
          <div className={s.github_links}>
            {gitHubData.map((el) => (
              <a
                key={el.name}
                href={el.link}
                target="_blanc"
                className="simple_link"
              >
                {el.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <a href="https://rs.school/" target="_blanc">
            <RsLogo height={40} data-testid="rs-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
