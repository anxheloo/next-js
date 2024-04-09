import React, { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import sql from "better-sqlite3";
import MealsLoadingPage from "./loading-out";

const db = sql("meals.db");

//we can add metadata to evey page to give infos about that page
export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals by our comunity.",
};

const GetAllMeals = async () => {
  //get all meals from db
  async function getMeals() {
    // await new Promise((promise) => setTimeout(promise, 2000));
    // throw new Error("Loading meals failed!");
    return db.prepare(`SELECT * FROM meals`).all();
  }

  const meals = await getMeals();

  return <MealsGrid meals={meals}></MealsGrid>;
};

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>

        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
        </p>

        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage></MealsLoadingPage>}>
          <GetAllMeals></GetAllMeals>
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
