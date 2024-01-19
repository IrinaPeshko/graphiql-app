import styles from './Modal.module.scss';
import WarningIcon from '../../assets/warning.svg?react';

interface ModalProps {
  errorMessage: string;
}
function Modal({ errorMessage }: ModalProps): JSX.Element {
  return (
    <div className={styles.modalWrapper}>
      <WarningIcon />
      <div>{errorMessage}</div>
    </div>
  );
}

export default Modal;
