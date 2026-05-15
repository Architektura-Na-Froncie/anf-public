import React, { useCallback, useState } from 'react';

import { TextTask } from 'api/exams';
import { TextField } from 'ui/molecules';

interface TextTaskViewProps {
  task: TextTask;
  onAnswerChange?: (taskId: TextTask['id'], answer: string) => void
}

export const TextTaskView: React.FC<TextTaskViewProps> = (props) => {
  const { task, onAnswerChange } = props;
  const [answer, setAnswer] = useState("");
  const updateAnswer = useCallback((newAnswer: string) => {
    setAnswer(newAnswer)
    onAnswerChange?.(task.id, newAnswer)
  }, [task, onAnswerChange]);

  return <>
    <TextField
      id={task.id}
      layoutDirection="vertical"
      label={task.question}
      onChange={(value) => updateAnswer(value)}
    />
  </>
}
