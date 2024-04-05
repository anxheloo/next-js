"use server";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { redirect } from "next/navigation";
const db = sql("meals.db");

async function saveMeal(meal) {
  // we turn the title to a slug for further use
  meal.slug = slugify(meal.title, { lower: true });
  // we protect our self from cross site attack by using xss, cuz we were vulnerable by using dangerouslySetHtml
  meal.instructions = xss(meal.instructions);

  // we have to store the images uploaded in our file system and store in db only the file path
  //we get the extension of the img
  const extension = meal.image.name.split(".").pop();
  //we make a custom file name
  const fileName = `${meal.slug}.${extension}`;
  //we store the image inside public folder in images folder
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals
    (title,summary,instructions,creator,creator_email,image,slug)
    VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
                 @slug)`
  ).run(meal);
}

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);

  redirect("/");
}
