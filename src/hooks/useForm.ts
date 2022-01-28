import {useState} from "react";

export function useForm<FormFields>(initialValues: FormFields) {
    const [formState, setFormState] = useState<FormFields>(initialValues);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [evt.target.name]: evt.target.value
        }));
    };

    const handleSubmit = (onSubmit: (formState: FormFields) => void) => {
        return (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            onSubmit(formState);
        };
    };

    return {
        formState,
        handleChange,
        handleSubmit,
    };
}

export default useForm;

