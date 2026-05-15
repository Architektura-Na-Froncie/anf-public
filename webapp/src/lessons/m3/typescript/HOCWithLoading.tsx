/* eslint-disable import/first */
import React from 'react'
import { Loader } from 'ui/atoms';

/**
 * 🔥 Czym jest HOC? (Higher-Order Component)
 * 
 * TL;DR; (OOP) jest fabryką innych komponentów
 * (FP) jest jednym więcej poziomem domknięcia (closure)
 * który pozwala sparametryzować inne komponenty
 * 
 * Normalnie komponenty moglibysmy opisać przy użyciu takiej sygnatury:
 *    COMPONENT : PROPS -> VDOM
 * 
 * natomiast HOC ma 1 poziom więcej:
 *    HOC : PARAMS -> COMPONENT
 * czyli
 *    HOC : PARAMS -> PROPS -> VDOM
 * (jak widać, closure)
 * 
 * przy czym te PARAMS mogą obejmować różne rzeczy. Mogą to być sztywne wartości
 * (stringi czy cokolwiek), a może to być inny komponent, który zostaje opakowany
 * dodatkową funkcjonalnością. Często jest to:
 *    HOC : (ComponentA, Params) -> PROPS -> VDOM
 * czyli poniekąd
 *    HOC : (ComponentA, Params) -> ComponentB
 * 
 * Po co?
 * - ponieważ trzeba było jakoś "wyciągać część wspólną" pomiędzy komponentami. I dopóki nie było hooków,
 * czyli logika była w komponentach klasowych - to HOCe były najczęściej stosowanych patternem.
 * (Wcześniej były mixiny 😓 - a potem "wynaleziono" render propsy; a teraz jesteśmy w epoce "hooków")
 */

interface WithLoadingProps {
  loading: boolean;
}

// 🔥 to jest HOC w wersji czysty JS

// const JS_WithLoading = (Component) =>
//   class WithLoading extends React.Component {
//     render() {
//       const { loading, ...props } = this.props;
//       return loading ? <Loader /> : <Component {...props} />;
//     }
//   };

// 🔥 a to - w wersji TS / KLASA
const _WithLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <Loader /> : <Component {...props as P} />;
    }
  };

// 🔥 a to - w wersji TS / FUNKCJA
export const WithLoading = <P extends object>(Component: React.ComponentType<P>) => {
  const withLoading: React.FC<P & WithLoadingProps> = (wrapperProps) => {
    const { loading, ...props } = wrapperProps;
    return loading ? <Loader /> : <Component {...props as P} />;
  }
  withLoading.displayName = "WithLoading"
  return withLoading
}
