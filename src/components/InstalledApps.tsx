// src/components/InstalledApps.tsx
import { useInstalledApps } from '../lib/installedAppsStore';

export function InstalledApps() {
  const { apps } = useInstalledApps();

  if (apps.length === 0) return <p className="text-xs text-muted-foreground">No apps gated in yet.</p>;

  return (
    <ul className="space-y-1 text-sm">
      {apps.map((app) => (
        <li key={app.id} className="text-foreground">
          • {app.name}
        </li>
      ))}
    </ul>
  );
}
