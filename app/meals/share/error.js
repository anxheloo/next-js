"use client";

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>Failed to create meal!</h1>
      <p>Please, provide valid credentials.</p>
    </main>
  );
}
