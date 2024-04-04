import React from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import sql from "better-sqlite3";

const MealsPage = async () => {
  const db = sql("meals.db");
  //get all meals from db
  async function getMeals() {
    await new Promise((promise) => setTimeout(promise, 2000));
    return db.prepare(`SELECT * FROM meals`).all();
  }

  const meals = await getMeals();

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
        <MealsGrid meals={meals}></MealsGrid>
      </main>
    </>
  );
};

export default MealsPage;
