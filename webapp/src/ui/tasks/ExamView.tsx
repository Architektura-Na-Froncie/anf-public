import React, { useCallback, useState } from 'react';

import { Button, Typography } from 'ui/atoms';
import { ButtonList } from 'ui/molecules';
import { Panel } from 'ui/layout';

import { Exam, ExamTask, TextTask } from "api/exams";
import { WelcomeView } from './WelcomeView';
import { ExitView } from './ExitView';
import { ChoiceTaskView } from './ChoiceTaskView';
import { TextTaskView } from './TextTaskView';
import { RichtextTaskView } from './RichtextTaskView';

// Poniższy kod jest do zaorania - tu należy zaimplementować pracę domową "Exams" z Modułu 4 :)

export const ExamView: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <Panel>
      <Typography variant="body">Praca domowa do zaimplementowania tutaj.</Typography>
      <Typography variant="h1">Question 1 of 3</Typography>

      <TextTaskView task={exam.tasks.find(task => task.type === "TEXT")! as TextTask} />

      <ButtonList align="center">
        <Button variant="PRIMARY">Start exam</Button>
        <Button variant="PRIMARY">Next task</Button>
        <Button variant="PRIMARY">Finish exam</Button>
      </ButtonList>
    </Panel>
  );
}
