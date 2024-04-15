import { ReactElement } from 'react';
import reactDom from 'react-dom';

interface ModalProps {
  onClose: () => void;
}

export function PortalModal({ children }: { children: ReactElement }) {
  const element = document.getElementById('modal');
  if (!element) return;
  return reactDom.createPortal(children, element);
}

export function Modal({ onClose }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h1>Modal</h1>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
}
