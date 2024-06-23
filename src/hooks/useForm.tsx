import { useRef, useCallback } from "react";

const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const inputsRef = useRef<{ [key in keyof T]: HTMLInputElement | null }>({} as any);

  const register = useCallback(
    (name: keyof T) => (el: HTMLInputElement | null) => {
      inputsRef.current[name] = el;
    },
    []
  );

  const getValues = useCallback(() => {
    const values: { [key in keyof T]: any } = {} as any;
    for (const key in inputsRef.current) {
      if (inputsRef.current[key]) {
        values[key] = inputsRef.current[key]!.value;
      }
    }
    return values;
  }, []);

  const reset = useCallback(() => {
    for (const key in inputsRef.current) {
      if (inputsRef.current[key]) {
        inputsRef.current[key]!.value = initialValues[key];
      }
    }
  }, [initialValues]);

  return { register, getValues, reset };
};

export { useForm };
