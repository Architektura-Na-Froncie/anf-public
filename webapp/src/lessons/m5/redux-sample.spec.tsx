import { fireEvent, render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";

import { Button, Typography } from "ui/atoms";
import {
  getA,
  getB,
  reducer,
  changeProperty,
  SampleState,
  getStore,
  changeAll,
} from "./redux-sample";

const SampleComponent: React.FC = () => {
  const a = useSelector(getA);
  const b = useSelector(getB);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h1">
        {a} {b}
      </Typography>
      <Button onClick={() => dispatch(changeProperty("A", "John"))}>
        change a
      </Button>
      <Button onClick={() => dispatch(changeProperty("B", "Smith"))}>
        change b
      </Button>
    </>
  );
};

/**
 * 🔥 UWAGA
 *
 * Ta konkretna implementacja Reduxa zawiera jedynie 2 pola (A, B)
 * Ale celowo chcemy zilustrować testy na możliwie najmniejszym przykładzie store'a
 * żeby móc skoncentrować się na samych testach.
 *
 * Testy na bardziej skomplikowanym store - to praca domowa 😇
 */
describe("Redux Sample", () => {
  const state: SampleState = { A: "John", B: "Lennon" };

  // 🔥 reducers
  it("should verify whether reducer results match snapshot", () => {
    const actionA = changeProperty("A", "Paul");
    const actionB = changeProperty("B", "McCartney");

    expect(reducer(state, actionA)).toMatchInlineSnapshot(`
      Object {
        "A": "Paul",
        "B": "Lennon",
      }
    `);
    expect(reducer(state, actionB)).toMatchInlineSnapshot(`
      Object {
        "A": "John",
        "B": "McCartney",
      }
    `);
  });

  // 🔥 selectors
  it("should verify whether selector results match snapshot", () => {
    expect(getA(state)).toMatchInlineSnapshot(`"John"`);
    expect(getB(state)).toMatchInlineSnapshot(`"Lennon"`);
  });

  // 🔥 thunks
  const getMockStore = () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = { A: "aaa", B: "bbb" };
    const store = mockStore(initialState);
    return store;
  };

  it("should dispatch certain actions when running a thunk", () => {
    const store = getMockStore();
    store.dispatch(changeAll("Clint", "Eastwood") as any); // kolizja typów między redux-mock-store i redux-thunk
    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "newValue": "Clint",
          "prop": "A",
          "type": "FIELD",
        },
        Object {
          "newValue": "Eastwood",
          "prop": "B",
          "type": "FIELD",
        },
      ]
    `);
  });

  // 🔥 connected components
  it("should dispatch actions when clicked and refresh the entire view through redux flow", () => {
    const { getByText, getByRole } = render(
      <Provider store={getStore()}>
        <SampleComponent />
      </Provider>
    );

    /**
     * 🔥 implicite asercja w formie getByText (lub innych query)
     * nie ma słowa expect
     * ale jeśli coś będzie nie tak, to i tak walnie błędem z precyzyjnym komunikatem
     */
    getByText("aaa bbb");

    fireEvent.click(getByRole("button", { name: "change a" }));

    getByText("John bbb");

    fireEvent.click(getByRole("button", { name: "change b" }));

    getByText("John Smith");
  });
});
