// services/students/services.ts
import { getAllStudents, getStudentById, updateStudent, createStudent, deleteStudent } from "./callers";

export const useGetStudents = async () => {
  try {
    const response = await getAllStudents();
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

export const useGetStudentById = async (id: number) => {
  try {
    const response = await getStudentById(id);
    return response;
  } catch (error) {
    console.error("Error fetching student by id:", error);
  }
};

export const useUpdateStudent = async (id: number, data: TStudentsList) => {
  try {
    const response = await updateStudent(id, data);
    return response;
  } catch (error) {
    console.error("Error updating student:", error);
  }
};

export const useCreateStudent = async (data: TStudentsList) => {
  try {
    const response = await createStudent(data);
    return response;
  } catch (error) {
    console.error("Error creating student:", error);
  }
};

export const useDeleteStudent = async (id: number) => {
  try {
    const response = await deleteStudent(id);
    return response;
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};
