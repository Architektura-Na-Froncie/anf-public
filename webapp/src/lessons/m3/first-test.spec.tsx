import React, { useEffect, useState } from 'react';
import { findByText, fireEvent, getByLabelText, getByText, render, screen } from '@testing-library/react';

import { Exam, getExam } from 'api/exams';
import { ExamView } from 'ui/tasks/ExamView';
import { Loader } from 'ui/atoms';

// mockowy egzamin
export const examPrawdaCzyWyzwanie: Exam = {
  id: 'a',
  userId: '82a68d27-efdc-4dc7-8073-85ce1ed9a9ef',
  tasks: [
    {
      type: 'CHOICE',
      id: '189a8646-7bcc-11eb-9439-0242ac130002',
      question: "Czy chrapiesz w nocy?",
      choices: [
        { id: '1', label: 'Tak' },
        { id: '2', label: 'Nie' },
      ],
    },
    {
      type: 'TEXT',
      id: 'bbb2137b-b310-45b0-81ff-16e7ccb19e08',
      question: "Kiedy ostatni raz miałeś kaca?",
    },
    {
      type: 'RICHTEXT',
      id: '46eab8ef-d3ee-4d85-92c4-e1442ad52b05',
      question: "Gdybyś miał być psem, to jakim?",
    },
  ]
};

// mikro-komponent pod test
const ExamProcess = () => {
  const [exam, setExam] = useState<Exam>()
  useEffect(() => {
    getExam('a').then(setExam)
  }, [])

  return exam ? <ExamView exam={exam} /> : <Loader />
}

jest.mock('../../api/exams', () => ({
  getExam: async () => examPrawdaCzyWyzwanie
}))

/*
 * 🔥 Implementacja procesu będzie pracą domową w module "Zarządzanie stanem - Hooks & Contexts".
 */
test.skip('ExamView', () => {
  it('should display exam content', async () => {
    // given
    const { findByText, findByRole, getByText, getByLabelText, debug, container } = render(<ExamProcess />)

    await findByText("Please click start to begin your exam.")
    const startBtn = await findByRole("button", { name: "Start exam" })

    // when
    fireEvent.click(startBtn)

    // pojechali!

    getByText("Czy chrapiesz w nocy?")
    // debug()

    const nextBtn = await findByRole("button", { name: "Next task" })
    fireEvent.click(nextBtn)

    // następne pytanie - proszę!

    const kacInput = getByLabelText("Kiedy ostatni raz miałeś kaca?")
    fireEvent.change(kacInput, { target: { value: "ło panie!" } })

    fireEvent.click(nextBtn)

    getByText("Gdybyś miał być psem, to jakim?")

    const finishBtn = await findByRole("button", { name: "Finish exam" })
    fireEvent.click(finishBtn)

    expect(container).toHaveTextContent("Exam completed!")
  });
});
