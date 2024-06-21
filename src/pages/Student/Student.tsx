import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/Table/Table'; // Importing CustomTable component
// import { useGetStudents } from '../../services/students/services';
import { getAllStudents } from '../../services/students/callers';

const Student: React.FC = () => {
  const [students, setStudents] = useState<TStudentsList[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents(); // Adjust the parameters if necessary
      setStudents(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }

  


  return (
    <div>
      <h1>Student List</h1>
      <CustomTable
        data={students}
        loading={loading}

        tableParams={{ pagination: { current: 1, pageSize: 10, total: students?.length || 0 } }} 
        handleTableChange={(pagination, filters, sorter) => {
          console.log(pagination, filters, sorter);
        }}
      />
    </div>
  );
};

export default Student;
