import React, { useState } from "react";
import { Table as AntTable, Modal, Tag } from "antd";
import type { TableProps as AntTableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomPopconfirm from "../PopConfirm";
import { useDeleteStudent } from '../../services/students/services';

interface CustomTableProps {
  data: TStudentsList[] | undefined;
  loading: boolean;
  tableParams: { pagination: AntTableProps<TStudentsList>["pagination"] };
  handleTableChange: AntTableProps<TStudentsList>["onChange"];
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  loading,
  tableParams,
  handleTableChange,
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const onEdit = (record: TStudentsList) => {
    console.log(record);
  };

  const onDelete = async (record: TStudentsList) => {
    setDeleting(true);
    try {
      // Simulate deletion (replace with actual API call)
      console.log(`Deleting student with ID: ${record.id}`);
      setTimeout(() => {
        console.log(`Student ${record.name} deleted successfully`);
        Modal.success({
          content: `Deleted Student ${record.name} successfully`,
        });
        setDeleting(false);
        // You should update your data source here if needed
      }, 1000);
    } catch (error) {
      console.error("Error deleting student:", error);
      Modal.error({
        title: "Error",
        content: `Failed to delete student ${record.name}. Please try again.`,
      });
      setDeleting(false);
    }
  };

  const handleChange: AntTableProps<TStudentsList>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (handleTableChange) {
      handleTableChange(pagination, filters, sorter, extra);
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
        { text: "Disabled", value: "Disabled" },
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
            onClick={() => onEdit(record)}
            style={{
              cursor: "pointer",
              marginRight: 12,
              border: "1px solid #f0f0f0",
              padding: "6px",
              borderRadius: "6px",
              backgroundColor: "#E8EFCF",
            }}
          />
          <CustomPopconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => onDelete(record)}
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
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleChange}
      bordered
      scroll={{ y: 240 }}
    />
  );
};

export default CustomTable;
