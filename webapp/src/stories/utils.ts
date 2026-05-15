import { useCallback, useState } from "react";
import { action } from '@storybook/addon-actions';

export const renderAction = action('render') as (...args: unknown[]) => void

export const useRandom = () => {
  const [random, setRandom] = useState(0);
  const randomize = () => setRandom(Math.random());

  return [random, randomize] as const;
};

export const useStepper = <T>(items: ReadonlyArray<T>) => {
  const [idx, setIdx] = useState(0);
  const current = items.length ? items[idx] : undefined;

  const isFirst = idx === 0
  const isLast = idx === items.length - 1
  const next = useCallback(() => setIdx(idx => idx + 1), [])
  const prev = useCallback(() => setIdx(idx => idx - 1), [])

  return { current, idx, isFirst, isLast, next, prev }
};
