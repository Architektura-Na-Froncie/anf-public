import { retryHTTP } from "./retryHTTP";
import { getEmployees } from "../../api/employees";

jest.mock("../../api/employees", () => ({
  getEmployees: jest.fn()
}))

describe('retryHTTP', () => {

  it('should try only once if succeeds', async () => {
    const mock = getEmployees as jest.Mock;
    mock.mockResolvedValueOnce([])
    const retryGetEmployees = retryHTTP(getEmployees, {
      maxAttempts: 3
    })

    expect(retryGetEmployees()).resolves.toEqual([])
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('should try at most n times and return value if succeeded', async () => {
    const mock = getEmployees as jest.Mock;
    mock
      .mockImplementationOnce(() => Promise.reject('kaboom! A-1'))
      .mockImplementationOnce(() => Promise.reject('kaboom! A-2'))
      .mockImplementationOnce(() => Promise.resolve([]));
    const retryGetEmployees = retryHTTP(getEmployees, {
      maxAttempts: 3
    })

    try {
      const result = await retryGetEmployees()
      expect(result).toEqual([])
    } catch (e){
      fail('should not reach this point')
    }
    expect(mock).toHaveBeenCalledTimes(3)
  })

  it('should try at most n times and fail afterwards', async () => {
    const mock = getEmployees as jest.Mock;
    mock.mockImplementation(() => Promise.reject('kaboom! B-1'));
    const retryGetEmployees = retryHTTP(getEmployees, {
      maxAttempts: 3
    })

    try {
      await retryGetEmployees()
      fail('should not reach this point')
    } catch (e){
      expect(e).toEqual('kaboom! B-1')
    }
    expect(mock).toHaveBeenCalledTimes(3)
    // return expect(retryGetEmployees()).rejects.toThrow('kaboom').then(
    //   () => expect(mock).toHaveBeenCalledTimes(3)
    // )
  });
});
