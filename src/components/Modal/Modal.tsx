import React from "react";
import { Modal } from "antd";
interface Props {
  title: string;
  onCancel: () => void;
  visible: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
function CustomeModal({ title, visible, onCancel, children, footer }: Props) {
  return (
    <Modal title={title} footer={footer} visible={visible} onCancel={onCancel}>
      {children}
    </Modal>
  );
}
export default CustomeModal;
