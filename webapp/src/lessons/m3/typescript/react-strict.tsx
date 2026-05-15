import { createContext, useContext, useState } from "react"

const Component1 = () => {
  // const [value, setValue] = useState("")
  // const [value, setValue] = useState<string>("")
  const [value, setValue] = useState<string | undefined>()
}



interface NumberContextValue {
  value: number
  updateValue: (newValue: number) => void
  reload: () => void
}
// const NumberContext = createContext()
const NumberContext = createContext<NumberContextValue | undefined>(undefined)

const Component2 = () => {
  const numberContext = useContext(NumberContext)
}
