/* eslint-disable import/first */
import React, { useCallback, useEffect, useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Exams/Tasks',
} as Meta;

import { ChoiceTask, Exam, ExamTask, getExam, RichtextTask, TextTask } from 'api/exams'
import { TextTaskView } from './TextTaskView'
import { ChoiceTaskView } from './ChoiceTaskView';
import { WelcomeView } from './WelcomeView';
import { ExitView } from './ExitView';
import { RichtextTaskView } from './RichtextTaskView';
import { ExamView } from './ExamView';

import { examA_JSON as exam } from 'api/mock/exams.mock';

const task: TextTask = {
  type: 'TEXT',
  id: '01611500-b310-45b0-81ff-16e7ccb19e08',
  question: "Are you living the life of your dreams?",
}

const choiceTask: ChoiceTask = {
  type: 'CHOICE',
  id: 'bbb2137b-b310-45b0-81ff-16e7ccb19e08',
  question: "Are you living the life of your dreams?",
  choices: [
    { id: '1', label: 'Yes' },
    { id: '2', label: 'No' },
    { id: '3', label: 'Maybe' },
    { id: '4', label: 'Perhaps' },
    { id: '5', label: 'And you?' },
  ],
}

export const _TextTask = () => {
  return <>
    <TextTaskView
      task={task}
      onAnswerChange={action('answer changed')}
    />
  </>
}

export const _ChoiceTask = () => {
  return <>
    <ChoiceTaskView
      task={choiceTask}
      onAnswerChange={action('answer changed')}
    />
  </>
}

const richtextTask: RichtextTask = {
  type: 'RICHTEXT',
  id: 'aaaaaaaa-b310-45b0-81ff-16e7ccb19e08',
  question: "Are you living the life of your dreams?",
}

export const _RichtextTask = () => {
  return <>
    <RichtextTaskView
      task={richtextTask}
      onAnswerChange={action('answer changed')}
    />
  </>
}

export const _Welcome = () => {
  return <WelcomeView />
}

export const _Exit = () => {
  return <ExitView />
}

export const _Exam = () => {
  return <ExamView exam={exam} />;
}
