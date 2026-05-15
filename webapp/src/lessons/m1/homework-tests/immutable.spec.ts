import { shoppingList, todos } from './mocks';

describe.skip('Immutable ES6 operations', () => {

	const john = {
		firstname: "John",
		lastname: "Lennon"
	}

	const paul = {
		firstname: "Paul",
		lastname: "McCartney"
	}

	const musician = {
		profession: "musician",
		salary: 5000
	}

	it('merge two objects', () => {
		// define `merge2objects` function here
		// for 2 given parameters, the function returns an new merged object 

		expect(merge2objects(john, musician)).toEqual({
			firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(merge2objects(paul, musician)).toEqual({
			firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('merging multiple objects', () => {
		// define `mergeManyObjects` function here
		// same as above, but accepts multiple objects as input parameters 

		expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
			id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
			id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('strip static attribute from objects', () => {
		// define `stripId` function here
		// it will return an immutable version of input object with `id` removed

		// all following expectations check the same - `id` attr should have been removed
		expect(stripId({
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			firstname: "John", lastname: "Lennon"
		})

		expect(stripId(shoppingList[0])).toEqual({
			type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
		})

		expect(todos.slice(0, 5).map(stripId)).toEqual([{
			"title": "Networked methodical function Shoes",
			"marked": true
		}, {
			"title": "Progressive client-server moratorium Car",
			"marked": true
		}, {
			"title": "Re-engineered logistical leverage Towels",
			"marked": false
		}, {
			"title": "Multi-channelled discrete budgetary management Bike",
			"marked": false
		}, {
			"title": "Seamless homogeneous functionalities Car",
			"marked": false
		}])
	})

	it('strip dynamic attribute from objects', () => {
		// define `stripKey` function here
		// same as above, but accepts the key as the 1st param (it's not hardcoded)
		// and the object itself as the 2nd param

		// OPTION 1: EASY, remove the attr, as long as the original one isn't affected

		// OPTION 2: use ES6 destructuring (a little tricky one)
		// hint: replace static attribute with a computed property ( attr ---> [attrExpr])

		expect(stripKey('firstname', {
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			id: 8492745921, lastname: "Lennon"
		})

		expect(stripKey('qty',
			stripKey('price', shoppingList[0]))).toEqual({
				type: 'Clothes', name: 'Socks', id: 421801449988
			})
	})

	it('default object properties', () => {
		// define `newTodo` function here
		// it is supposed to fill the output object with `marked: false`, if marked is not passed in input

		expect(newTodo({
			"title": "Networked methodical function Shoes",
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": false
		})

		expect(newTodo({
			"title": "Networked methodical function Shoes",
			"marked": false
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": false
		})

		expect(newTodo({
			"title": "Networked methodical function Shoes",
			"marked": true
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": true
		})
	})
})
