type CountMap = {
  [id: string]: number
}

export const countBy = <T>(collection: T[], mapFn: (item: T) => string) => {
  return collection.reduce<CountMap>((aggr, item) => {
    const key = mapFn(item)
    if (!aggr[key]){
      aggr[key] = 0
    }
    aggr[key]++
    return aggr
  }, {})
}
