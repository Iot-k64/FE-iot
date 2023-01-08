import React from 'react';

export default function Modal({
  isModalOpen,
  onOk,
  onCancel,
  title,
  children
}) {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
}
