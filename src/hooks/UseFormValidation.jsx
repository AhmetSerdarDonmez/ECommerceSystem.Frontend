// hooks/useFormValidation.js
import { useState } from 'react';

const useFormValidation = (initialState, validateFunction) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });

        // If there's an error for this field, clear it
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleSubmit = async (event, onSubmit) => {
        event.preventDefault();

        // Validate form
        const validationErrors = validateFunction(values);
        setErrors(validationErrors);

        // If no errors, submit the form
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);

            try {
                await onSubmit(values);
                // Reset form after successful submission if needed
                // setValues(initialState);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const resetForm = () => {
        setValues(initialState);
        setErrors({});
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
        setValues
    };
};

export default useFormValidation;