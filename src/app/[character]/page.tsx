import Image from "next/image";
import { Metadata } from "next";

type CharacterData = {
  name: string;
  description: string;
  imageUrl: string;
};

async function fetchCharacterData(character: string): Promise<CharacterData> {
  const data: { [key: string]: CharacterData } = {
    ironman: {
      name: "Iron Man",
      description: "Tony Stark, a billionaire genius turned superhero.",
      imageUrl: "/images/ironman.jpg",
    },
    "captain-america": {
      name: "Captain America",
      description: "Steve Rogers, the first Avenger and a symbol of freedom.",
      imageUrl: "/images/captain-america.jpg",
    },
  };

  return (
    data[character] || {
      name: "Unknown Hero",
      description: "Hero details not found.",
      imageUrl: "/images/unknown.jpg",
    }
  );
}

export async function generateMetadata({
  params,
}: {
  params: { character: string };
}): Promise<Metadata> {
  const characterData = await fetchCharacterData(params.character);

  return {
    title: characterData.name,
    description: characterData.description,
    openGraph: {
      title: characterData.name,
      description: characterData.description,
      images: [
        {
          url: characterData.imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CharacterPage({
  params,
}: {
  readonly params: { character: string };
}) {
  const characterData = await fetchCharacterData(params.character);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{characterData.name}</h1>
      <p>{characterData.description}</p>
      <Image
        src={characterData.imageUrl}
        alt={`${characterData.name}`}
        width={600} // Provide explicit width
        height={400} // Provide explicit height
        priority // Preload the image for faster LCP
        style={{ maxWidth: "100%", height: "auto" }} // Adjust for responsive design
      />
    </div>
  );
}
