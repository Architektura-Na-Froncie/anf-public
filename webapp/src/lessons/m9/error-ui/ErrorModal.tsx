import React from 'react';
import styled from 'styled-components';

import { Button } from 'ui/atoms';
import { Modal, ModalButtons } from 'ui/molecules';

import { ErrorContent } from './ErrorContent';
import { UserErrorMessage } from './messages';
import { useLogMessage } from '../logger';

interface ErrorModalProps {
  isOpen: boolean;
  errorMessage: UserErrorMessage;
  onClose: () => void;
}

const ErrorImage = styled.img`
  position: relative;
  top: 0;
  left: 50%;
  width: 120px;
  transform: translate(-50%, -110px);
  margin-bottom: -110px;
`;

export const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  const { isOpen, errorMessage, onClose } = props

  useLogMessage(`Error Modal displayed '${errorMessage.type}`, "ERROR", isOpen);

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
  >
    <ErrorImage src="/hanging-monkey.png" alt="error occurred" />
    <ErrorContent message={errorMessage} noImage />
    <ModalButtons>
      <Button variant="PRIMARY" onClick={onClose}>OK</Button>
    </ModalButtons>
  </Modal>
}
