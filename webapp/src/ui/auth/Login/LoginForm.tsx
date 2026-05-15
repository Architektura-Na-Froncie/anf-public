import React, { useState } from 'react';

import styled from 'styled-components';
import { Button, Typography } from 'ui/atoms';
import { TextField } from 'ui/molecules';

const LoginWrapper = styled.section`
  display: block;
  width: 100%;
  max-width: 360px;
  border-radius: 6px;
  background-color: #fafafa;
  margin: 1rem auto;
  padding: 1rem;
`

interface LoginFormProps {
  onSubmit: (accountId: string, password: string) => void
  error?: string
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmit, error } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return <LoginWrapper>
    <Typography variant="h4">Logowanie</Typography>
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(username, password)
    }}>
      <TextField
        id="input-login-username"
        label="Login"
        defaultValue={username}
        onChange={setUsername}
        error={error}
        layoutDirection="vertical"
      />
      <TextField
        type="password"
        id="input-login-password"
        label="Hasło"
        defaultValue={password}
        onChange={setPassword}
        error={error}
        layoutDirection="vertical"
      />
      <Button
        id="btn-login"
        data-testid="btn-login"
        variant="PRIMARY"
      >Zaloguj się</Button>
    </form>
  </LoginWrapper>
}
