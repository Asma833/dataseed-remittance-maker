import React, { useState } from "react";
import { AgentFormContext } from "./agent-form-context";

export const AgentFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = React.useCallback(
    (step: string, data: Record<string, any>) => {
      console.log(`Updating ${step} with:`, data);
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          [step]: data,
        };
        console.log("Updated form data:", newData);
        return newData;
      });
    },
    []
  );

  const saveFormData = async () => {
    try {
      console.log("Saving complete form data:", formData);
      // API call
      // await api.saveAgentForm(formData);
      return Promise.resolve(formData);
    } catch (error) {
      console.error("Error saving form data:", error);
      throw error;
    }
  };

  return (
    <AgentFormContext.Provider
      value={{ formData, updateFormData, saveFormData }}
    >
      {children}
    </AgentFormContext.Provider>
  );
};
