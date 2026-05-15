type Invoice = {
  number: string,
  date: Date
  positions: {
    name: string
    price: number
    quantity: number
  }[]
  rebate: number
}

type Bill = {
  date: Date
  totalPrice: number
}

type CompanyPurchase = Invoice | Bill

const getPrice = (purchase: CompanyPurchase): number => {
  // implementation here...
}

// 🔥 a potem rozszerzamy Unię o trzeci typ, np.
// type DebtPayment = { amount: number; due: Date }
