
import { useEffect, useState } from 'react';
import { WindowProps } from '../types';

interface Agent {
  id: string;
  name: string;
  status: string;
  role: string;
}

export default function AgentDashboard({ id }: WindowProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data.agents || []);
      })
      .catch(err => {
        console.error('Failed to fetch agents:', err);
        setError('Unable to load agents.');
      });
  }, []);

  return (
    <div className="p-6 space-y-4 text-green-100">
      <h2 className="text-2xl font-bold text-gold">Active Agents</h2>
      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : agents.length === 0 ? (
        <p className="text-sm text-muted-foreground">No agents found.</p>
      ) : (
        <ul className="space-y-3">
          {agents.map(agent => (
            <li
              key={agent.id}
              className="border border-gold rounded-md p-4 bg-black shadow-sm"
            >
              <div className="font-semibold text-gold">{agent.name}</div>
              <div className="text-xs text-muted-foreground">
                Status: {agent.status} • Role: {agent.role}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
