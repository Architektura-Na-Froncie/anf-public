import { createContext, useContext } from "react";

export const stuffContext = createContext({ value: 42 })

export const useStuff = () => useContext(stuffContext)
