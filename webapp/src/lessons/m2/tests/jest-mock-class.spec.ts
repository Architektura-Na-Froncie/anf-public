import { Stuff } from "./stuff";

// OPCJA 1: FAKE
// jest.mock("./stuff", () => {
//   return {
//     Stuff: class {
//       constructor(
//         private mockData: number[]
//       ){}

//       calculate(){
//         return this.mockData.reduce((product, n) => product * n)
//       }
//     }
//   }
// });

// OPCJA 2: MOCK
jest.mock("./stuff");
test("module should a class/constructor mocked", () => {
  (Stuff as jest.Mock).mockImplementation((mockData: number[]) => ({
    calculate: () => mockData.reduce((product, n) => product * n),
  }));

  const mocked = new Stuff([1,2,3,4]);
  expect(mocked.calculate()).toEqual(24);
});
