import React from 'react';
import styled from 'styled-components';
import { inputBase } from './inputBase';

export const TextArea = styled.textarea`
  ${inputBase}
  height: 100px;
  min-height: 50px;
  vertical-align: top;
`

// interface TextAreaProps {
//   disabled?: boolean;
//   error?: any;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
// }
