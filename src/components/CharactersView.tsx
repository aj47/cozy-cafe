import React from 'react';
import { characters, Descriptions } from '../../data/characters';

export default function CharactersView() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Characters List</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Texture URL</th>
            <th className="border p-2">Speed</th>
            <th className="border p-2">Identity</th>
            <th className="border p-2">Plan</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => {
            const description = Descriptions.find(
              (desc) => desc.character === char.name
            );
            return (
              <tr key={char.name}>
                <td className="border p-2">{char.name}</td>
                <td className="border p-2">{char.textureUrl}</td>
                <td className="border p-2">{char.speed}</td>
                <td className="border p-2">{description?.identity || 'N/A'}</td>
                <td className="border p-2">{description?.plan || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
