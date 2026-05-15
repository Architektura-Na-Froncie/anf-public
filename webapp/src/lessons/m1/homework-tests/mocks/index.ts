export interface Todo {
	id: string;
	title: string;
	marked: boolean;
}

export const todos: Todo[] = require('./todos.json')

type ShoppingItem = {
	type: string;
	name: string;
	price: number;
	qty: number;
}

export interface ShoppingItemWithId extends ShoppingItem {
	id: number;
}

export const shoppingList: ShoppingItemWithId[] = require('./shopping-list.json')

export type ShoppingItemsDictionary = {
	[idx: number]: ShoppingItem;
}

export const shoppingDict: ShoppingItemsDictionary = require('./shopping-dict.json')

export type Money = number

export type Nationality = "US" | "UK" | "FR" | "DE" | "NL" | "PL" | "IT" | "ES";

export type ContractType = "contract" | "permanent";

export interface Employee {
  "id": number;
  "nationality": Nationality,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": Money;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": string;
  "hiredAt": string;
  "expiresAt": string;
  "personalInfo": {
    "age": number;
    "phone": string;
    "email": string;
    "dateOfBirth": string;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": string[];
  "bio": string;
}

export const employees: Employee[] = require('./employees.json')

export type Geo = {
  [nat in Nationality]: string
};

export const geo: Geo = require('./geo.json')
