export {}

type Value = number

type ItemMap = {
  [key: string]: Value
}
declare const map: ItemMap

type ItemRecord = Record<string, Value>
declare const record: ItemRecord

// 1. intro
// 2. dodanie mapItem i recordItem poniżej
// 3. najpierw było string -> number, a teraz zamieniamy number -> string, dalej unsafe

const mapItem = map[1]
const mapItem2 = map['elo']
const recordItem = record[1]
const recordItem2 = record['elo']
