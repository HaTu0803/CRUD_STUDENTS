import { students } from "./paths";
import axios from "axios";

export const getAllStudents = async () => {
  const response = await axios.get(students, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
};

export const getStudentById = async (id: number) => {
  const response = await axios.get(`${students}${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
};

export const updateStudent = async (id: number, data: TStudentsList) => {
  const response = await axios.put(`${students}${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
};

export const createStudent = async (data: TStudentsList) => {
  const response = await axios.post(students, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
};

export const deleteStudent = async (id: number) => {
  const response = await axios.delete(`${students}${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; 
};
