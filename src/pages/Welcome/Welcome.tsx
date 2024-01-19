import WelcomeBlock from '../../components/welcome/welcome-block/WelcomeBlock';
import TeamBlock from '../../components/welcome/team-block/TeamBlock';
import ProjectBlock from '../../components/welcome/project-block/ProjectBlock';
import CourseBlock from '../../components/welcome/course-block/CourseBlock';

export default function Welcome() {
  return (
    <div>
      <WelcomeBlock />
      <TeamBlock />
      <ProjectBlock />
      <CourseBlock />
    </div>
  );
}
