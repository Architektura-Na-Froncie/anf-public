import React from 'react';

/**
 * 🔥 Czym są RENDER PROPS?
 * 
 * TL;DR; to forma odwrócenia kontroli w Reakcie, który i tak odwraca kontrolę 🤓
 * (bo zamiast bezpośrednio montować DOMa, produkuje VDOMa, a tym zajmuje się i później i kto inny)
 * 
 * Normalnie komponent buduje cały swój widok. Przyjmuje propsy, ma stan
 * - ale sam decyduje o tym jak widok wygląda.
 * 
 * Natomiast w przypadku render prop - o części widoku decyduje SAM, a część przychodzi
 * właśnie jako RENDER PROP - czyli props, który jest funkcją produkującą widok
 * (można by powiedzieć, że to zagnieżdżony komponent)
 * 
 * Po co?
 * - żeby osiągnąć elastyczność, np. jak poniżej - o wyglądzie LISTY decyduje komponent ItemsList
 * ale o wyglądzie pojedynczego ELEMENTU - render prop (czyli rodzic, który przekazuje render propa)
 * - niektóre komponenty wykorzystujące render propsy są czysto wizualne (poniżej) - a inne zawierają
 * logikę (w tym side effecty, np. pobieram dane + renderuję listę, a pojedyncze elementy - render-prop)
 * 
 * U nas dodatkowo robimy i komponent i render propsa GENERYCZNIE - dzięki temu typ T jest POWIĄZANY:
 * dotyczy ITEMów + render propsa (gdybyśmy przekazali coś niekompatybilnego - TS będzie nas ścigał)
 */

interface ItemsListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode // 🔥 RENDER PROP
}

export function ItemsList<T extends { id: string | number }>(props: ItemsListProps<T>){
  const { items, renderItem } = props
  return <ul>
    { items.map( item => <li key={item.id}>{ renderItem(item) }</li> ) }
  </ul>
}
