import React from "react";

const Share = ({ params }) => {
  return (
    <div>
      <p>Share page</p>
      <p>{params.slug}</p>
    </div>
  );
};

export default Share;
