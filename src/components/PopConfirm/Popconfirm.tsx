import React from "react";
import { Popconfirm } from "antd";

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  description?: string;
  okText: string;
  cancelText: string;
  children: React.ReactNode;
}
const CustomePopconfirm: React.FC<Props> = ({
  title,
  onConfirm,
  onCancel,
  description,
  okText,
  cancelText,
  children,
}) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      description={description}
    >
      {children}
    </Popconfirm>
  );
};
export default CustomePopconfirm;
