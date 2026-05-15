import { rest } from 'msw';
import { BASE_URL } from "env/config";

import { Exam } from '../exams';

import examA_mock_JSON from './exam-a.mock.json';
import examB_mock_JSON from './exam-b.mock.json';

export const examA_JSON = examA_mock_JSON as Exam;
export const examB_JSON = examB_mock_JSON as Exam;

export const examMockHandlers = [
  rest.get<never, never, Exam>(`${BASE_URL}/exams/a`, async (req, res, ctx) => {
    return res(
      ctx.json(examA_JSON),
    )
  }),
  rest.get<never, never, Exam>(`${BASE_URL}/exams/b`, async (req, res, ctx) => {
    return res(
      ctx.json(examB_JSON),
    )
  }),
];
