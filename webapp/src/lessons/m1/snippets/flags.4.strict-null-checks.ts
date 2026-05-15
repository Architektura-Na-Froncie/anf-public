import { Employee } from "./types"
declare const employees: Employee[]

const john: Employee = employees.find(e => e.firstName === 'John')

type TrainingGroup = {
  date?: Date
  employees: Employee[]
}

let training: TrainingGroup = { employees: [] }
const dateStr = training.date.toISOString()
