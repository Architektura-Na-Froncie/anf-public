const express = require('express')
const { v4: uuid } = require('uuid')

const { logError, logDebug } = require('../lib/util');

const router = express.Router()

const inMemoryExamsState = [
  {
    id: 'a',
    userId: '6ca8b2e6-67e3-464b-b688-6878ffc34c0e',
    tasks: [
      {
        type: 'TEXT',
        id: 'e853ac10-4a6a-4b29-8767-caa0462b64ef',
        question: "Are you living the life of your dreams?",
      },
      {
        type: 'CHOICE',
        id: '41fe3dc3-c2da-4d5c-995d-0ab51f5148cc',
        question: "Is it better to buy than to rent?",
        choices: [
          { id: '1', label: 'Yes' },
          { id: '2', label: 'No' },
          { id: '3', label: 'Maybe' },
          { id: '4', label: 'Perhaps' },
          { id: '5', label: 'And you?' },
        ],
      },
      {
        type: 'RICHTEXT',
        id: '317b9c4e-77d0-4c6c-9fa5-31e1df7ea1f4',
        question: "How worried are you about global warming?",
      },
    ]
  },
  {
    id: 'b',
    userId: '084d0951-313f-41f5-bf4a-426e2629dd2f',
    tasks: [
      {
        type: 'CHOICE',
        id: '20c51819-7bbe-4937-9082-131cf6201e31',
        question: "Is it better to buy than to rent?",
        choices: [
          { id: '1', label: 'Yes' },
          { id: '2', label: 'No' },
          { id: '3', label: 'Maybe' },
          { id: '4', label: 'Perhaps' },
          { id: '5', label: 'And you?' },
        ],
      },
      {
        type: 'CHOICE',
        id: 'e6e737c3-8424-494b-802f-eb988ec4b624',
        question: "Why Should We Hire You?",
        choices: [
          { id: '1', label: 'Yes' },
          { id: '2', label: 'Also yes' },
        ],
      },
      {
        type: 'CHOICE',
        id: 'e2cf97cc-1465-4495-aa78-d4003de2dc02',
        question: "Why Were You Fired?",
        choices: [
          { id: '2', label: 'No' },
          { id: '5', label: 'And you?' },
        ],
      },
      {
        type: 'CHOICE',
        id: '84f1e385-0fdb-47c4-b849-7a23538304d0',
        question: "What’s Your Current Salary?",
        choices: [
          { id: '2', label: 'No' },
        ],
      },
    ],
  },
]

router.get('/exams', (req, res) => {
  return res.status(200).send(inMemoryExamsState);
});

router.get('/exams/:id', (req, res) => {
  const { id } = req.params;
  const exam = inMemoryExamsState.find(exam => exam.id === id)

  if (!exam){
    logError(() => `Exam id:${id} not found`)
    return res.sendStatus(404);
  } else {
    return res.status(200).send(exam);
  }
});

router.post('/exams/:id', (req, res) => {
  const { id } = req.params;
  const exam = inMemoryExamsState.find(exam => exam.id === id)

  if (!exam){
    logError(() => `Exam id:${id} not found`)
    return res.sendStatus(404);
  } else {
    logDebug(() => `Received answer for exam id:${id}:\n${JSON.stringify(req.body, null, 2)}`)
    return res.sendStatus(200);
  }
});

module.exports = router
