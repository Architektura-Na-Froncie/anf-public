import axios from 'axios'

// mamy w aplikacji taki oto interfejsik
export interface Transfer {
  id: string;
  amount: number;
  title: string;
  payerAccount: string;
  beneficiaryAccount: string;
  beneficiaryAddress: string;
  scheduledAt: string;
}

// i piszemy "funkcję HTTP", która ma zwracać promisę.
// 🤔 jak ja otypować?

// opcja 1 - "use the platform", czyli native fetch

export const __getTransfers = () => {
  return fetch('/account/transfers')
  .then(res => res.json())
  // .then(collection => collection.mkjhgbvnmjhgvbnmjhgv)
}
// - spoko... ale mamy zwracane Promise<any>
// - no bo nie napisałeś typu zwracanego
// (dodajemy typ zwracany: Promise<Transfer[]>)
// (odkomentowujemy linijkę z then, bo jesteśmy złośliwi)
// - 😳 ale że jak?
// wchodzimy w definicję/sygnaturę native fetch i widzimy, że 🎺 brakuje generyka w wywołaniu 🎺



// opcja 2 - czy axios coś zmienia?

export const getTransfers = (): Promise<Transfer[]> => {
  return axios.get('/account/transfers')
    .then(res => res.data)
    .then(collection => collection.mkjhgbvnmjhgvbnmjhgv)
}
// - jeśli anotujemy typ wynikowy, to nadal lipa
// - 😳 omg...



// opcja 3 - otypujmy WYWOŁANIE a nie wynik

export const _getTransfers = () => {
  return axios.get<Transfer[]>('/account/transfers')
    .then(res => res.data)
    .then(collection => collection.mkjhgbvnmjhgvbnmjhgv)
}
// uf 😅
