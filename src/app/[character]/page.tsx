// app/[character]/page.tsx
import React from "react";

interface Params {
  character: string;
}

export default async function CharacterPage({
  params,
}: {
  readonly params: Promise<Params>;
}) {
  const { character } = await params;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to {character}&apos;s Page</h1>
      <p>This is the detailed page about {character}.</p>
    </div>
  );
}
