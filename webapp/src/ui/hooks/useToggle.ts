import { useCallback, useState } from "react";

export const useToggle = (initial = false) => {
  const [isChecked, setChecked] = useState(initial);
  // useCallback - zwłaszcza że w custom hooku - zapobiega nadmiarowym re-renderom
  const toggle = useCallback(
    // currentlyChecked ZAMIAST isChecked (lint: no-shadow)
    // setter z callbackiem (zamiast `setChecked(!checked)`) żeby zapobiec stale closures
    () => setChecked(currentlyChecked => !currentlyChecked),
  [])
  // 🔥 typowanie wyniku
  // return [isChecked, toggle] as [typeof isChecked, typeof toggle]; // <- precyzyjnie typowana krotka (ale niewygodny zapis)
  return [isChecked, toggle] as const; // <- "as const" (const assertion) "zamraża" wszystko na poziomie typów

  // 🔥 struktura wyniku
  // return { isChecked, toggle }
  // - w przypadku wyniku jako arraya:
  //    łatwiej przenazwiać zmienne pod indeksem
  //    ale upierdliwe śledzenie zmiennych pod indeksami
  //    (np. na wypadek zmiany / dodania / usunięcia elementów; kolejność ma znaczenie)
  // - w przypadku wyniku jako obiektu - odwrotnie :)
  //    nieco więcej pisania przy przenazwianiu
  //    ale nie ma śledzenia indeksów - zamiast tego śledzimy klucze (kolejność bez znaczenia)
};

/*
UŻYCIE:
// built-in hooks (mniej kodu, ale podobne ryzyko co w primitive obsession)
const [currentValue, setValue] = useState(true)

// custom hooks pozwalają nam precyzyjnie definiować intencje
const [display, toggle] = useToggle(false)
*/
