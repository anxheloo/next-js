"use server";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const db = sql("meals.db");

function isInvalidText(text) {
  return !text || text.trim() === "";
}

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

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid Input");
    return { message: "Invalid input" };
  }

  await saveMeal(meal);
  // A build in function to throw away existing cache and get the new one with the new meal added.
  // By default "next" caches all pages to static when we run build for production. And prevents us from seeing new meals.
  // Thats why we use this function
  revalidatePath("/meals"); // we can also add another parameter for example:  revalidatePath("/meals", "layout") -> to revalidate all the pages of meals.
  redirect("/meals");
}
