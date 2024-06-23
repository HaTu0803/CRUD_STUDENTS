import React, { useEffect, useState } from "react";
import { Table as AntTable, Modal, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomPopconfirm from "../PopConfirm";
import CustomModal from "../Modal";
import { useDeleteStudent } from "../../services/students/services";
import { FormRegister } from "../../components/Form/Form";
import { getAllStudents } from "../../services/students/callers";
interface CustomTableProps {
  data: TStudentsList[] | undefined;
  loading: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({ data, loading }) => {
  const [studentData, setStudentData] = useState<TStudentsList[] | undefined>(
    data
  );
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<TStudentsList | null>(
    null
  );

  const showEditModal = (record: TStudentsList) => {
    setEditingRecord(record);
  };

  const closeEditModal = () => {
    setEditingRecord(null);
  };

  useEffect(() => {
    setStudentData(data);
  }, [data]);

  const fetchStudents = async () => {
    setEditing(true);
    try {
      const response = await getAllStudents();
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setEditing(false);
    }
  };

  const handleFormSuccess = () => {
    closeEditModal();
    fetchStudents();
  };
  const handleCancel = () => {
    closeEditModal();
  };

  const OnDelete = async (record: TStudentsList) => {
    setDeleting(true);
    try {
      const response = await useDeleteStudent(record.id);
      console.log(response);
      Modal.success({
        title: "Success",
        content: `Student ${record.name} deleted successfully!`,
      });
      setStudentData((prevData) =>
        prevData?.filter((student) => student.id !== record.id)
      );
      setDeleting(false);
    } catch (error) {
      console.error("Error deleting student:", error);
      setDeleting(false);
    }
  };

  const columns: ColumnsType<TStudentsList> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Tag color={record.status === "Active" ? "success" : "error"}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
      fixed: "right",
      render: (_, record) => (
        <>
          <EditOutlined
            style={{
              cursor: "pointer",
              border: "1px solid #f0f0f0",
              padding: "6px",
              borderRadius: "6px",
              backgroundColor: "#E6F7FF",
              marginRight: "8px",
            }}
            onClick={() => showEditModal(record)}
          />
          <CustomModal
            title="Edit Student"
            visible={editingRecord === record}
            onCancel={handleCancel}
            footer={null}
          >
            <FormRegister
              student={record}
              isEdit={true}
              onSuccess={handleFormSuccess}
            />
          </CustomModal>

          <CustomPopconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => OnDelete(record)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{
                cursor: "pointer",
                border: "1px solid #f0f0f0",
                padding: "6px",
                borderRadius: "6px",
                backgroundColor: "#F8D7DA",
              }}
            />
          </CustomPopconfirm>
        </>
      ),
    },
  ];

  return (
    <AntTable
      columns={columns}
      rowKey={(record) => record.id.toString()}
      dataSource={studentData}
      loading={loading || deleting || editing}
      scroll={{ y: 240 }}
    />
  );
};

export default CustomTable;
