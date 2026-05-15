import { createStore, Reducer } from "redux"

export const changeProperty = (prop: "A" | "B", newValue: string) => ({
  type: "FIELD",
  prop, newValue,
} as const)

type SampleAction = ReturnType<typeof changeProperty>
export interface SampleState {
  A: string
  B: string
}

const initialState = {
  A: "aaa",
  B: "bbb",
}
export const reducer: Reducer<SampleState, SampleAction> = (state = initialState, action) => {
  switch (action.type){
    case "FIELD":
      return { ...state, [action.prop]: action.newValue }

    default:
      return state
  }
}

export const getA = (state: SampleState) => state.A
export const getB = (state: SampleState) => state.B

export const changeAll = (newA: string, newB: string) =>
  (dispatch: SampleStore['dispatch']) => {
    dispatch(changeProperty('A', newA))
    dispatch(changeProperty('B', newB))
  }

export const getStore = () => createStore(reducer)

type SampleStore = ReturnType<typeof getStore>
