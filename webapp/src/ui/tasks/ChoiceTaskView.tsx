import React, { useCallback, useState } from 'react';

import { CheckboxField } from 'ui/molecules';
import { ChoiceTask } from 'api/exams';

interface ChoiceTaskViewProps {
  task: ChoiceTask
  onAnswerChange?: (taskId: ChoiceTask['id'], choices: string[]) => void
}

export const ChoiceTaskView: React.FC<ChoiceTaskViewProps> = (props) => {
  const { task, onAnswerChange } = props
  const [answer, setAnswer] = useState<string[]>([])
  const updateAnswer = useCallback((newAnswer: string[]) => {
    setAnswer(newAnswer)
    onAnswerChange?.(task.id, newAnswer)
  }, [task, onAnswerChange])

  return <>
    <p>{ task.question }</p>
    <div>
      {task.choices.map((choice) => (
        <CheckboxField id={choice.id} label={choice.label} key={choice.id} onChange={(checked) => {
          const newAnswer = answer.filter((chosenId) => choice.id !== chosenId);
          if (checked) {
            newAnswer.push(choice.id);
          }
          updateAnswer(newAnswer);
        }} />
      ))}
    </div>
  </>
}
