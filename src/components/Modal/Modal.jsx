import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import clsx from 'clsx';

import scss from './Modal.module.scss';
import { MdClose } from 'react-icons/md';

/**
 *
 * @parentElementComponents
 * import { useToggle } from 'hooks/useToggle';
 *  const {isOpen, onOpen,onClose} = useToggle();
 *
 * Example
 * <button type='button' onClick={onOpen}>Open Modal</button>
 *
 * { isOpen &&
 * <Modal onClose={onClose}>
 * <h2>Modal title</h2>
 * <p>Modal content goes here</p>
 * <button type='submit' onClick={onClose}>DONE</button>
 * </Modal>}
 */

const Modal = ({
  onClose,
  notStyled = false,
  position = null,
  noBg = false,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return createPortal(
    <>
      <div
        className={clsx(scss.modalOverlay)}
        onClick={handleClickBackdrop}
        style={{ ...(notStyled && { backgroundColor: 'transparent' }) }}
      ></div>
      <div
        className={clsx(scss.modalBody)}
        style={{
          ...(position && { top: position.top, left: position.left }),
          ...(notStyled && { padding: 0 }),
          ...(noBg && { backgroundColor: 'transparent' }),
        }}
      >
        {!notStyled && (
          <button onClick={handleClose} className={clsx(scss.closeButton)}>
            <MdClose className={clsx(scss.closeButtonIcon)} />
          </button>
        )}
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
