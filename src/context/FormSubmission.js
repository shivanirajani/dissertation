
import React, { createContext, useContext, useState } from 'react';

const FormSubmission = createContext();

export const useFormSubmission = () => useContext(FormSubmission);

export const FormSubmissionProvider = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <FormSubmission.Provider value={{ isSubmitted, setIsSubmitted }}>
      {children}
    </FormSubmission.Provider>
  );
};
