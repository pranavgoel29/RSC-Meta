// app/[character]/generateMetadata.tsx
import { Metadata } from 'next';

// Define a type for the character data
type CharacterData = {
  name: string;
  description: string;
  imageUrl: string;
};

// Mock function to simulate fetching data based on the route
async function fetchCharacterData(character: string): Promise<CharacterData> {
  const data: { [key: string]: CharacterData } = {
    ironman: {
      name: 'Iron Man',
      description: 'Tony Stark, a billionaire genius turned superhero.',
      imageUrl: '/images/ironman.jpg',
    },
    'captain-america': {
      name: 'Captain America',
      description: 'Steve Rogers, the first Avenger and a symbol of freedom.',
      imageUrl: '/images/captain-america.jpg',
    },
  };

  return data[character] || {
    name: 'Unknown Hero',
    description: 'Hero details not found.',
    imageUrl: '/images/unknown.jpg',
  };
}

// Generate metadata dynamically based on the route
export async function generateMetadata({
  params,
}: {
  params: { character: string };
}): Promise<Metadata> {
  const characterData = await fetchCharacterData(params.character);

console.log(characterData);

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
