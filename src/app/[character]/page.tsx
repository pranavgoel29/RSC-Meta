import Image from "next/image";
import { Metadata } from "next";

type CharacterData = {
  name: string;
  description: string;
  imageUrl: string;
};

type Params = {
  character: string;
};

async function fetchCharacterData(character: string): Promise<CharacterData> {
  const data: { [key: string]: CharacterData } = {
    ironman: {
      name: "Iron Man",
      description: "Tony Stark, a billionaire genius turned superhero.",
      imageUrl:
        "https://raw.githubusercontent.com/pranavgoel29/test-repo/main/captain-america.jpg",
    },
    "captain-america": {
      name: "Captain America",
      description: "Steve Rogers, the first Avenger and a symbol of freedom.",
      imageUrl:
        "https://raw.githubusercontent.com/pranavgoel29/test-repo/main/ironman.jpg",
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
  readonly params: Promise<Params>;
}): Promise<Metadata> {
  const { character } = await params;
  const characterData = await fetchCharacterData(character);

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
  readonly params: Promise<Params>;
}) {
  const { character } = await params;
  const characterData = await fetchCharacterData(character);

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
