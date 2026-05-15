import React, { useCallback, useState } from 'react'

type Task = {
  id: string
  question: string
}

interface TaskViewProps {
  task: Task
  taskIndex: number
  initialAnswer?: string
  onAnswerChange: (taskId: Task['id'], answer: string) => void
}

export const TaskView: React.FC<TaskViewProps> = (props) => {
  const { task, taskIndex, initialAnswer, onAnswerChange } = props
  const [answer, setAnswer] = useState(initialAnswer || "")
  const updateAnswer = useCallback((answer: string) => {
    setAnswer(answer)
    onAnswerChange(task.id, answer)
  }, [task.id, onAnswerChange])

  return <>
    <h1>Question {taskIndex}</h1>
    <p>{ task.question }</p>
    <input
      value={answer}
      onChange={(e) => updateAnswer(e.target.value)}
    />
  </>
}
