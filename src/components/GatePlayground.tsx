
import { Card, CardContent } from './ui/card';
import { useInstalledApps } from '../lib/installedAppsStore';
import { useWindowStore } from '../lib/windowStore';
import { Button } from './ui/button';

const availableTools = [
  { name: 'Slack', description: 'Send messages, alerts & integrations' },
  { name: 'Notion', description: 'Trigger content blocks & workflows' },
  { name: 'Google Sheets', description: 'Manage tabular data & triggers' },
  { name: 'Discord', description: 'Send alerts, messages or events' },
  { name: 'Typeform', description: 'Trigger flows from form submissions' }
];

export default function GatePlayground() {
  const { apps, addApp } = useInstalledApps();
  const { addWindow } = useWindowStore();

  const isInstalled = (tool: string) =>
    apps.some(app => app.name.toLowerCase() === tool.toLowerCase());

  const handleGate = (tool: string) => {
    if (!isInstalled(tool)) {
      addApp({ name: tool });
    }

    addWindow({
      id: `gate-${tool}-${Date.now()}`,
      type: 'gateIn',
      title: `Gated: ${tool}`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 150 },
      size: { width: 600, height: 400 },
      data: { target: tool }
    });
  };

  return (
    <div className="p-6 space-y-6 text-green-100">
      <h2 className="text-2xl font-bold text-gold">Gate Playground</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableTools
          .filter(tool => !isInstalled(tool.name))
          .map(tool => (
            <Card key={tool.name} className="bg-black border border-gold shadow-md">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gold">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                <Button
                  className="bg-gold text-black w-full hover:bg-yellow-400"
                  onClick={() => handleGate(tool.name)}
                >
                  Gate In
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
