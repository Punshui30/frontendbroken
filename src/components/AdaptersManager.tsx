
import { useEffect, useState } from 'react';
import { WindowProps } from '../types';

interface Adapter {
  id: string;
  name: string;
  version: string;
  status: string;
}

export default function AdaptersManager({ id }: WindowProps) {
  const [adapters, setAdapters] = useState<Adapter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/adapters')
      .then(res => res.json())
      .then(data => {
        setAdapters(data.adapters || []);
      })
      .catch(err => {
        console.error('Failed to fetch adapters:', err);
        setError('Unable to load adapters.');
      });
  }, []);

  return (
    <div className="p-6 space-y-4 text-green-100">
      <h2 className="text-2xl font-bold text-gold">Installed Adapters</h2>
      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : adapters.length === 0 ? (
        <p className="text-sm text-muted-foreground">No adapters found.</p>
      ) : (
        <ul className="space-y-3">
          {adapters.map(adapter => (
            <li
              key={adapter.id}
              className="border border-gold rounded-md p-4 bg-black shadow-sm"
            >
              <div className="font-semibold text-gold">{adapter.name}</div>
              <div className="text-xs text-muted-foreground">
                Version: {adapter.version} • Status: {adapter.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
