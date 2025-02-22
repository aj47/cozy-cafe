import React from 'react';
import { characters, Descriptions } from '../../data/characters';
import { Stage } from '@pixi/react';
import { Character } from './Character';

export default function CharactersView({ onCharacterSelect }: { onCharacterSelect?: (characterId: string) => void }) {
  const validCharacters = characters.filter((char) => {
    const description = Descriptions.find((desc) => desc.character === char.name);
    return Boolean(description && description.name);
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Characters List</h2>
      <div className="overflow-y-auto max-h-[80vh]">
        <div className="grid grid-cols-1 gap-4">
          {validCharacters.map((char) => {
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
                {/* Get the first frame data. */}
                const frameKeys = Object.keys(char.spritesheetData.frames);
                const firstFrameKey = frameKeys[0];
                const frame = char.spritesheetData.frames[firstFrameKey].frame;

                <Stage
                  width={frame.w}
                  height={frame.h}
                  options={{ backgroundAlpha: 0, backgroundColor: 0 }}
                  style={{ pointerEvents: 'none' }}
                >
                  <Character
                    textureUrl={char.textureUrl}
                    spritesheetData={char.spritesheetData}
                    // Center the sprite within the Stage.
                    x={frame.w / 2}
                    y={frame.h / 2}
                    orientation={0} // You can adjust this if needed.
                    isMoving={false}
                    onClick={() => onCharacterSelect && onCharacterSelect(char.name)}
                  />
                </Stage>
                <h3 className="font-bold text-lg">{displayName}</h3>
                <p>{description?.identity || 'N/A'}</p>
                {description?.plan && <p className="text-sm text-gray-500">{description.plan}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
