import React from 'react';
import { characters, Descriptions } from '../../data/characters';

export default function CharactersView({ onCharacterSelect }: { onCharacterSelect?: (characterId: string) => void }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Characters List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map((char) => {
          const description = Descriptions.find(desc => desc.character === char.name);
          return (
            <div
              key={char.name}
              onClick={() => onCharacterSelect && onCharacterSelect(char.name)}
              className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <img
                src={char.textureUrl}
                alt={`${char.name} sprite`}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3 className="font-bold text-lg">{char.name}</h3>
              <p>{description?.identity || 'N/A'}</p>
              {description?.plan && <p className="text-sm text-gray-500">{description.plan}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
