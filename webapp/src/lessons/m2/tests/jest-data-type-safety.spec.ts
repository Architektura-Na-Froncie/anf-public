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

// 1. TYPE ANNOTATION

const getTotalSalary = (employees: Employee[]) =>
  employees.reduce((sum, e) => sum + e.salary, 0)

describe('getTotalSalary', () => {
  it('should calculate sum of employees salaries (type annotation)', () => {
    const mockEmployees: Employee[] = [{
      salary: 100
    }, {
      salary: 200
    }]

    const result = getTotalSalary(mockEmployees);
    expect(result).toEqual(300);
  });

  // 2. TYPE ASSERTION

  it('should calculate sum of employees salaries (type assertion)', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }] as Employee[]

    const result = getTotalSalary(mockEmployees);
    // const result = getTotalSalary(mockEmployees.filter(e => e.nationality == 'PL'));
    expect(result).toEqual(300);
  });

  // PROXY

  const asProxy = <TAsserted extends TActual, TActual extends object = object>(t: TActual) => {
    const proxy = new Proxy(t, {
      get: function(obj, prop) {
        if (!(prop in obj)) {
          throw new Error(`Trying to access non-existent property "${String(prop)}" on object ${JSON.stringify(obj)}`)
        }

        // IF powyżej nie gwarantuje jako type guard, że `prop` istnieje w `obj`, stąd type assertion
        return (obj as any)[prop];
        // return obj[prop as keyof TActual];
      }
    })
    return proxy as TAsserted
  }

  // 3. PROXY

  // istnieją wymagane pola
  it('should calculate sum of employees salaries (ES6 proxy)', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }].map(obj => asProxy<Employee>(obj))

    const result = getTotalSalary(mockEmployees);
    expect(result).toEqual(300);
  });

  // unskip
  // NIE istnieją wymagane pola
  it.skip('should calculate sum of _filtered_ employees salaries (ES6 proxy)', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }].map(obj => asProxy<Employee>(obj))

    const result = getTotalSalary(mockEmployees.filter(e => e.nationality == 'PL'));
    expect(result).toEqual(300);
  });

});
