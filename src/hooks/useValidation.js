import { useState, useEffect } from 'react';

const useValidation = (values, validate, setSubmitted) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                setSubmitted(true);
            }
            setIsSubmitting(false);
        }
    }, [errors, isSubmitting, setSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setIsSubmitting(true);
    };

    return [errors, handleSubmit];
};

export default useValidation;
