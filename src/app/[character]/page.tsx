// app/[character]/page.tsx
import React from "react";

export default function CharacterPage({
  params,
}: {
  readonly params: { character: string };
}) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to {params.character}&apos;s Page</h1>
      <p>This is the detailed page about {params.character}.</p>
    </div>
  );
}
