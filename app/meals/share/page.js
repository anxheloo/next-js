"use client";

import React from "react";
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/serverActions/action";
import { useRef } from "react";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useFormState } from "react-dom";

export default function ShareMealPage() {
  const formRef = useRef();

  // const handleSubmit = async (formData) => {
  //   const res = await shareMeal(formData);
  //   formRef.current?.reset();

  //   return res;
  // };

  // We use this useFormState in order to get the object from our shareMeal function that is passed to our form.
  // If its an error in our server side, we return an object with a message. Here by using useFormState we update the status of the object.
  // Than we pass it in the end of our form.Is similar to useState
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form className={classes.form} ref={formRef} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker name={"image"} label={"Pick an image"}></ImagePicker>

          {state.message && <p>{state.message}</p>}

          <p className={classes.actions}>
            <MealsFormSubmit></MealsFormSubmit>
          </p>
        </form>
      </main>
    </>
  );
}
