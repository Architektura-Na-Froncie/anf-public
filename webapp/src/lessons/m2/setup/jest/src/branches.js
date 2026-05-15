const doA = console.log
const doNotA = console.log
const doB = console.log
const doNotB = console.log

export function branches(condA, condB){
  if (condA){
    doA()
  } else {
    doNotA()
  }
  
  if (condB){
    doB()
  } else {
    doNotB()
  }
}
