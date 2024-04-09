import React from "react";
import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "../page";
import { notFound } from "next/navigation";

// to generate dynamic metadata we use this function below.s
export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    // this calles the closest notFound page
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.slug);

  // meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  if (!meal) {
    // this calles the closest notFound page
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill alt="Specific meal image"></Image>
        </div>

        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, "<br />"),
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
