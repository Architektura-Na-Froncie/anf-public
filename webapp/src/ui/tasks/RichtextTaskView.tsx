import React, { useCallback, useState } from 'react';

import { RichtextTask } from 'api/exams'
import { Editor } from 'ui/molecules';

interface RichtextTaskViewProps {
  task: RichtextTask
  onAnswerChange?: (taskId: RichtextTask['id'], answer: string) => void
}

export const RichtextTaskView: React.FC<RichtextTaskViewProps> = (props) => {
  const { task, onAnswerChange } = props
  const [answer, setAnswer] = useState("")
  const updateAnswer = useCallback((newAnswer: string) => {
    setAnswer(newAnswer)
    onAnswerChange?.(task.id, newAnswer)
  }, [task, onAnswerChange])

  return <>
    <p>{ task.question }</p>
    <Editor onChange={updateAnswer} />
  </>
}
