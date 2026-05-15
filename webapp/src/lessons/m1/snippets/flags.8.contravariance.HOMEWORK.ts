import axios from "axios"

type ChoiceQuestion = {
  type: "CHOICE"
  answer: {
    [key: string]: boolean
  }
}
declare const choiceQuestion: ChoiceQuestion

type EssayQuestion = {
  type: "ESSAY"
  answer: {
    text: string
  }
}
declare const essayQuestion: EssayQuestion

type Question = 
  | ChoiceQuestion
  | EssayQuestion


function processQuestion(sendAnswer: (q: Question) => void, q: Question){
  sendAnswer(q)
}

function sendChoiceQuestion(choiceQuestion: ChoiceQuestion){
  axios.post('server', choiceQuestion)
}
function sendEssayQuestion(essayQuestion: EssayQuestion){
  axios.post('server', essayQuestion)
}

// logiczne - na krzyż nie można:
processQuestion(sendChoiceQuestion, essayQuestion)
processQuestion(sendEssayQuestion, choiceQuestion)
// mniej intuicyjne, ale logiczne:
processQuestion(sendChoiceQuestion, choiceQuestion)
processQuestion(sendEssayQuestion, essayQuestion)
// a jeśli chcemy powiązać choice z choice, to wrzucamy generyka: <T extends Question> (zamiast Question):
// function processQuestion<TQuestion extends Question>(sendAnswer: (q: TQuestion) => void, q: TQuestion)



// a teraz ogólniejszy typ

type ExamSection =
  | Question
  | { type: "INTRODUCTION" }
declare const examSection: ExamSection

function sendExamSection(examSection: ExamSection){
  axios.post('server', examSection)
}
//              ogólniejszy jest ok (bo pozycja KONTRAwariancyjna)
//                               precyzyjniejszy jest ok (bo pozycja KOwariancyjna)
processQuestion(sendExamSection, essayQuestion)
// i to jest ok
