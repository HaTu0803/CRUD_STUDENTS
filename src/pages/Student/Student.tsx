import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/Table/Table';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { FormRegister } from '../../components/Form/Form';
import CustomModal from '../../components/Modal/Modal';
import Search from '../../components/Search/Search';
import { getAllStudents } from '../../services/students/callers'; // Adjust TStudent type as per your implementation

const Student: React.FC = () => {
  const [data, setData] = useState<TStudentsList[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

 useEffect(() => {
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await getAllStudents();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }
  fetchStudents();
}
, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSuccess = (newStudent: TStudentsList) => {
    handleCloseModal();
    setData(prevData => prevData ? [...prevData, newStudent] : [newStudent]);
  };

  const handleSearch = (name: string, status: string | undefined) => {
    setFilterName(name);
    setFilterStatus(status);
  };

  const filteredData = data?.filter(student => {
    if (filterName && !student.name.toLowerCase().includes(filterName.toLowerCase())) {
      return false;
    }
    if (filterStatus && student.status !== filterStatus) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1>Student List</h1>
      <div style={{ marginBottom: '8px', display: 'flex' }}>
        <Search onSearch={handleSearch} />
      </div>
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<UserAddOutlined />} onClick={handleOpenModal}>
          Add Student
        </Button>
      </div>
      <CustomTable data={filteredData} loading={loading} />
      <CustomModal
        title="Add Student"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <FormRegister onSuccess={handleFormSuccess} />
      </CustomModal>
    </div>
  );
};

export default Student;
