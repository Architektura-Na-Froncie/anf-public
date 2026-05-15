import React, { ComponentProps, useEffect, useState } from "react";
import ReactModal from 'react-modal';

//   ładujemy CSS module jako słownik:
//     klucz: nazwa klasy CSS z pliku
//     wartość: wygenerowany hash
// import ModalStyles from './Modal.module.css';
// const modalClass = {
//   modal: ModalStyles.modal,
//   overlay: ModalStyles.overlay,
//   bodyOpen: ModalStyles.bodyOpen,
//   closeButton: ModalStyles.closeButton,
//   buttons: ModalStyles.buttons,
// };

//   lub to samo ale zwięźlej :)
import modalClass from './Modal.module.css';

// konsument modala jest właścicielem tego stanu; modal jest sterowany z zewn.
export const useModalToggle = () => {
  const [modalIsShown, showModal] = useState(false);
  const open = () => showModal(true);
  const close = () => showModal(false);
  return [modalIsShown, open, close] as const;
};

type ModalProps = Pick< ComponentProps<typeof ReactModal>, "isOpen" | "onRequestClose" >

// ReactModal requires that the app root element is provided, so that it can
// hide the app from screen readers (by setting aria-hidden="true") when the
// modal is open. We're using #root as default.
const root = document.querySelector('#root');
if (root) {
  ReactModal.setAppElement('#root');
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, onRequestClose, children } = props

  return <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={modalClass.modal}
    overlayClassName={modalClass.overlay}
    bodyOpenClassName={modalClass.bodyOpen}
    shouldCloseOnOverlayClick={false}
  >
    <button className={modalClass.closeButton} onClick={onRequestClose}>
      &times; <span>Close</span>
    </button>
    {children}
  </ReactModal>
}

export const ModalButtons: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <footer className={modalClass.buttons}>
      {children}
    </footer>
  );
}
