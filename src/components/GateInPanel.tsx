
import { useInstalledApps } from '../lib/installedAppsStore';
import { useWindowStore } from '../lib/windowStore';
import { WindowProps } from '../types';

export default function GateInPanel({ id }: WindowProps) {
  const { apps } = useInstalledApps();
  const { addWindow } = useWindowStore();

  const supportedTools = [
    'Notion', 'Google Sheets', 'Slack', 'Discord', 'Airtable',
    'Trello', 'Gmail', 'Jira', 'GitHub'
  ];

  const uninstalled = supportedTools.filter(tool =>
    !apps.some(app => app.name.toLowerCase() === tool.toLowerCase())
  );

  const handleGate = (tool: string) => {
    addWindow({
      id: `gate-${Date.now()}`,
      type: 'gateIn',
      title: `Gate In ${tool}`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 300, y: 200 },
      size: { width: 600, height: 400 },
      data: { target: tool }
    });
  };

  return (
    <div className="p-6 space-y-4 text-green-100">
      <h2 className="text-xl font-bold text-gold">Gate In a Tool</h2>
      {uninstalled.length === 0 ? (
        <p className="text-sm text-muted-foreground">All supported tools are already gated in 🎉</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {uninstalled.map(tool => (
            <li key={tool}>
              <button
                className="w-full py-2 px-3 rounded-lg bg-gold text-black hover:bg-yellow-400 transition"
                onClick={() => handleGate(tool)}
              >
                {tool}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
