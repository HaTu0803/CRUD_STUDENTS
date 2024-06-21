import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/Table/Table'; // Importing CustomTable component
// import { useGetStudents } from '../../services/students/services';
import { getAllStudents } from '../../services/students/callers';




const Student: React.FC = () => {
  const [data, setData] = useState<TStudentsList[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true); 
  
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await getAllStudents(); 
      setData(response.data);
  
      setLoading(false);
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
        data={data}
        loading={loading}

      />
    </div>
  );
};

export default Student;
