import React from "react";
import Link from "next/link";

const MealsPage = () => {
  return (
    <div>
      <p>MealsPage</p>
      <Link href="/meals/meal-1">Meal 1</Link>
    </div>
  );
};

export default MealsPage;
