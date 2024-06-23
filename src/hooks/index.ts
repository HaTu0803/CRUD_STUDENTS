import { useContext } from "react";
import { useForm } from "./useForm";
// Context
import { StudentContext } from "../contexts/StudentContext";

const useStudent = () => {
  const studentContext = useContext(StudentContext);

  if (!studentContext) {
    throw new Error("useStudent must be used within a StudentProvider");
  }

  return studentContext;
};

export { useForm, useStudent };
