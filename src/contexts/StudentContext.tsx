import React, { ReactNode, createContext, useReducer } from "react";

interface Student {
  Id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
}

interface StudentContextProps {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student, index: number) => void;
  deleteStudent: (index: number) => void;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

type StudentAction =
  | { type: "ADD_STUDENT"; student: Student }
  | { type: "UPDATE_STUDENT"; student: Student; index: number }
  | { type: "DELETE_STUDENT"; index: number };

const StudentReducer = (state: Student[], action: StudentAction): Student[] => {
  switch (action.type) {
    case "ADD_STUDENT":
      return [...state, action.student];
    case "UPDATE_STUDENT":
      return state.map((student, i) =>
        i === action.index ? { ...student, ...action.student } : student
      );
    case "DELETE_STUDENT":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
};

const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, dispatch] = useReducer(StudentReducer, []);

  const addStudent = (student: Student) => {
    dispatch({ type: "ADD_STUDENT", student });
  };

  const updateStudent = (student: Student, index: number) => {
    dispatch({ type: "UPDATE_STUDENT", student, index });
  };

  const deleteStudent = (index: number) => {
    dispatch({ type: "DELETE_STUDENT", index });
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
