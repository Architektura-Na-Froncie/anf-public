import axios from 'axios';

import { BASE_URL } from 'env/config';

type LoginRequestDTO = {
  username: string
  password: string
}

type LoginResponseDTO = {
  accessToken: string
}

export const login = async (request: LoginRequestDTO) => {
  const response = await axios.post<LoginResponseDTO>(
    `${BASE_URL}/auth/login`,
    request
  )
  return response.data
}

export const logout = async () => {
  await axios.post<void>(
    `${BASE_URL}/auth/logout`
  )
}
