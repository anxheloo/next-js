import React from "react";

const MealsSlug1 = ({ params }) => {
  return (
    <div>
      <p>Dynamic page</p>
      <p>{params.slug}</p>
    </div>
  );
};

export default MealsSlug1;
