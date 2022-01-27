import { useState } from "react";

export function useForm<FormField>(initialValues: FormField) {
  const [formState, setFormState] = useState<FormField>(initialValues);
  const [touched, setTouched] = useState({});

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const valid = true;
  const handleSubmit = (onSubmit: (formState: FormField) => void) => {
    return (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (valid) onSubmit(formState);
    };
  };

  return {
    formState,
    handleChange,
    handleSubmit,
  };
}

export default useForm;

