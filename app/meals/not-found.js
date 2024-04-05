"use client";
import { usePathname } from "next/navigation";

export default function NotFound({ error }) {
  const path = usePathname();

  //   const pathText = path.split("/")[2];

  console.log("this is path:", path);

  return (
    <main className="error">
      <h1>
        Couldnt find <br></br> {path}
      </h1>
      <p>Failed to fetch meal data.</p>
    </main>
  );
}
