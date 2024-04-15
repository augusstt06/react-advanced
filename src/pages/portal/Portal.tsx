/*
Portal - React 에서 컴포넌트를 렌더링 하는 위치를 사전에 선택하여 렌더링 하게 하는 기능
*/

import { useState } from 'react';

import { Modal, PortalModal } from '@/pages/portal/childs/Modal.tsx';

export default function Portal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <section>
      <h2>Portal</h2>
      <section id='modal'>
        <button onClick={handleModal}>Open Modal</button>
        <PortalModal>{isModalOpen ? <Modal onClose={handleModal} /> : <></>}</PortalModal>
      </section>
    </section>
  );
}
