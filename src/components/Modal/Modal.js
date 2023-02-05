import React from 'react';
import {  Modal as ModalAntd } from 'antd';
export default function Modal({
  isModalOpen,
  onOk,
  onCancel,
  title,
  children    
}) {
  return (
    <ModalAntd
      title={title}
      open={isModalOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      {children}
    </ModalAntd>
  );
}
