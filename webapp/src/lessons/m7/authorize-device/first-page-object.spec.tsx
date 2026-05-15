import { fireEvent, render, waitFor } from "@testing-library/react";

import { AuthorizeDevicePO } from './first.po'

// import { getTokenInstruction, sendTokenCode } from '../../../api/token'
jest.mock('../../../api/token', () => ({
  getTokenInstruction: async () => ({
    instruction: "Wpisz hasło SMS",
    tokenId: "1111-2222-3333-4444"
  }),
  sendTokenCode: async (params: { tokenCode: string }) => {
    if (params.tokenCode.length !== 4){
      throw new Error(`Invalid confirmation token!`)
    }
  },
}))

describe('AuthorizeDevice', () => {
  it('should allow once after the user passes the correct password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

    // when
    authorizeDevicePO.clickChooseAllowOnceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki")

    // when
    authorizeDevicePO.submitAllowOnceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisappeared("Jednorazowy wjazd do apki")
    await authorizeDevicePO.expectLoaderDisappeared()
    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });
})
