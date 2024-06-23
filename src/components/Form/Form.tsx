import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Modal } from "antd";
import { useStudent } from "../../hooks";
import {
  createStudent,
  updateStudent as updateStudentService,
} from "../../services/students/callers";

interface FormRegisterProps {
  student?: TStudentsList;
  isEdit?: boolean;
  onSuccess: (newStudent: TStudentsList) => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({
  student,
  isEdit,
  onSuccess,
}) => {
  const { addStudent, updateStudent, students } = useStudent();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && student) {
      form.setFieldsValue(student);
    }
  }, [isEdit, student, form]);

  const HandleSubmit = async (values: TStudentsList) => {
    try {
      if (isEdit && student) {
        const response = await updateStudentService(student.id, values);
        if (response.data) {
          const index = students.findIndex((s) => s.Id === student.id);
          updateStudent({ ...values, Id: student.id }, index);
        }
        Modal.success({
          title: "Success",
          content: `Student ${values.name} updated successfully!`,
        });
      } else {
        const response = await createStudent({ ...values, status: "Active" });
        if (response.data) {
          addStudent({
            ...values,
            Id: response.data.id,
            status: "Active",
          });
        }
        Modal.success({
          title: "Success",
          content: `Student ${values.name} added successfully!`,
        });
      }
      form.resetFields();
      if (onSuccess) {
        onSuccess(values);
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      message.error("Failed to submit form. Please check your inputs.");
    }
  };

  return (
    <Form
      form={form}
      onFinish={HandleSubmit}
      layout="vertical"
      initialValues={{
        id: student?.id || "",
        name: student?.name || "",
        email: student?.email || "",
        phone: student?.phone || "",
        status: student?.status || "Active",
      }}
    >
      {isEdit && (
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input the email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: "Please input the phone number!" },
          {
            pattern: /^\d{10}$/,
            message: "Please enter a valid 10-digit phone number!",
          },
        ]}
      >
        <Input placeholder="Phone" type="tel" />
      </Form.Item>
      {isEdit && (
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export { FormRegister };
