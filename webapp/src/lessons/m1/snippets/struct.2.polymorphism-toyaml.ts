export {}

// przykładose zastosowanie "polimorfizmu strukturalnego"

import * as fs from 'fs'

// 1.

type Data = { value: unknown } // są w systemie _jakieś dane_
declare function asYAML(data: Data[]): string // i jest _jakaś funkcja_ która zrzuca arraya do stringa YAMLowego

const toYAMLFile = (tasks: Iterable<Data>, filename: string) => {
  const dataArray = Array.from(tasks)
  const content = asYAML(dataArray)
  console.log(`Processed ${dataArray.length.toString()} items.`)
  fs.writeFileSync(filename, content, 'utf-8')
}
// 🤓 funkcja oczekuje dowolnego Iterable'a (czegoś, po czym można iterować, patrz ES6 iteration protocol)

// 2. wywołujemy funkcję

declare const dataArray: Data[]
declare const dataSet: Set<Data>

toYAMLFile(dataArray, 'array.yaml')
toYAMLFile(dataSet, 'set.yaml')

// 😳 działa dla arrayów, działa dla zbiorów, nieźle!

// 3. wywołujemy z Map<K, V>
declare const dataMap: Map<string,Data>

toYAMLFile(dataMap, 'map.yaml') // ❌ expected Iterable<Data>, received: Iterable<[string, Data]>
// domyślny iterator z ES6 Map to: Iterable<[string, Data]>
// nie zgadza się sygnatura iteratora

toYAMLFile([...dataMap], 'map.yaml') // ❌ expected Iterable<Data>, received: Iterable<[string, Data]>
// generalnie to samo, co powyżej: Iterable<[string, Data]>

toYAMLFile(dataMap.values(), 'map.yaml') // ✅ received: Iterable<Data>
// a tutaj sygnatura iteratora już się zgadza 🙃
