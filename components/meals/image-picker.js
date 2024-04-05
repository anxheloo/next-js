"use client";

import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const ref = useRef();

  const [uploadedImg, setUploadedImg] = useState(null);

  const handleImageInputChange = () => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      setUploadedImg(null);
      return;
    }

    //WAY 1
    // const cachedURL = URL.createObjectURL(uploadedFile);
    // setUploadedImg(cachedURL);

    //WAY 2
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = () => {
      setUploadedImg(reader.result);
    };
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name} className={classes}>
        {label}
      </label>
      <div className={classes.controls}>
        <input
          ref={ref}
          className={classes.input}
          id={name}
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          //   value={uploadedImg}
          onChange={handleImageInputChange}
          required
        ></input>

        <button
          className={classes.button}
          type="button"
          onClick={() => {
            ref.current.click();
          }}
        >
          Pick an Image
        </button>
      </div>

      <div className={classes.preview}>
        {uploadedImg ? (
          <Image
            src={uploadedImg}
            alt="uploaded img"
            fill
            // width={200}
            // height={200}
          ></Image>
        ) : (
          <p>No image picket yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
