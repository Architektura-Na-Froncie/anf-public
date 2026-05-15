const path = (items: string[] = []) => {
  return {
    add(item: string){
      return path([...items, item])
    },
    toString(){
      return items.join('/')
    },
  }
}

const rootPath = path(['Lessons'])

export const lessons = {
  m1: rootPath.add('M1 Type-Safety'),
  m2: rootPath.add('M2 Testing'),
  m3: rootPath.add('M3 React'),
  m4: rootPath.add('M4 Hooks & Contexts'),
  m5: rootPath.add('M5 Redux'),
  m6: rootPath.add('M6 State Machines'),
  m7: rootPath.add('M7 Integration Testing'),
  m8: rootPath.add('M8 Reactive'),
  m9: rootPath.add('M9 Error handling'),
  m10: rootPath.add('M10 End-to-end Testing'),
  mx: rootPath.add('M? Model-based Testing'),
}
