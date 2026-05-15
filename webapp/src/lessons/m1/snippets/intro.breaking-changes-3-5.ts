// sprawdzamy najpierw na 3.3 a potem na 3.5

// 1.
const s = new Set()

// 2.
function apiCall<T>(){
    var result: any
    return result as T
}

apiCall() // {} albo unknown
