import React from "react";
import { useFormStatus } from "react-dom";

const MealsFormSubmit = () => {
  //we use this hook to get the state of the form
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default MealsFormSubmit;
