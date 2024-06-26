import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang không tồn tại"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      }
    />
  );
};

export default Error;
