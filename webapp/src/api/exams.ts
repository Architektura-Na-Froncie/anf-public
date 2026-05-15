import axios from "axios";
import { BASE_URL } from "env/config";


export interface TextTask {
  type: 'TEXT'
  id: string
  question: string
}

export interface Choice {
  id: string;
  label: string;
}

export interface ChoiceTask {
  type: 'CHOICE'
  id: string
  question: string
  choices: Choice[];
}

export interface RichtextTask {
  type: 'RICHTEXT'
  id: string
  question: string
}

export type ExamTask =
  | TextTask
  | RichtextTask
  | ChoiceTask
  ;

export interface Exam {
  id: string;
  userId: string;
  tasks: ExamTask[];
}

export const getExam = async (examId: string) => {
  const response = await axios.get<Exam>(`${BASE_URL}/exams/${examId}`);
  return response.data;
}
