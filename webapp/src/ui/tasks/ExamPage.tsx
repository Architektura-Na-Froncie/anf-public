import { ExamView } from './ExamView';
import { examA_JSON as exam } from 'api/mock/exams.mock';

export const ExamPage: React.FC = () => {
  return <ExamView exam={exam} />;
}
