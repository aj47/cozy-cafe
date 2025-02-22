import React from 'react';
import { characters, Descriptions } from '../../data/characters';

export default function CharactersView({ onCharacterSelect }: { onCharacterSelect?: (characterId: string) => void }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Characters List</h2>
      <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[80vh]">
        {characters.map((char) => {
          const description = Descriptions.find(desc => desc.character === char.name);
          const displayName = description?.name || char.name;

          // Get the first frame key from the spritesheet data.
          const frameKeys = Object.keys(char.spritesheetData.frames);
          const firstFrameKey = frameKeys[0];
          // Assuming the frame object is stored under a property named "frame"
          const frame = char.spritesheetData.frames[firstFrameKey].frame;

          return (
            <div
              key={char.name}
              onClick={() => onCharacterSelect && onCharacterSelect(char.name)}
              className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <div
                role="img"
                aria-label={`${displayName} sprite`}
                className="mb-2"
                style={{
                  width: `${frame.w}px`,
                  height: `${frame.h}px`,
                  backgroundImage: `url(${char.textureUrl})`,
                  backgroundPosition: `-${frame.x}px -${frame.y}px`,
                  backgroundSize: char.spritesheetData.meta?.size
                    ? `${char.spritesheetData.meta.size.w}px ${char.spritesheetData.meta.size.h}px`
                    : 'contain',
                }}
              />
              <h3 className="font-bold text-lg">{displayName}</h3>
              <p>{description?.identity || 'N/A'}</p>
              {description?.plan && <p className="text-sm text-gray-500">{description.plan}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
