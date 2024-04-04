import React from "react";
import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";

const MealsGrid = ({ meals }) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal, index) => (
        <li key={meal.id}>
          <MealItem {...meal}></MealItem>
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
