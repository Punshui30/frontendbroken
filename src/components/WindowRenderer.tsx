import { WindowProps } from '../types';
import GateInPanel from './GateInPanel';
// Removed FlowEditor and Window
import { Flow3DWindow } from './Flow3DWindow';
import CopilotPanel from './CopilotPanel';
import AdaptersManager from './AdaptersManager';
import AgentDashboard from './AgentDashboard';
import ErrorBoundary from './ErrorBoundary';

export default function WindowRenderer({ window }: { window: WindowProps }) {
  let content: React.ReactNode = null;

  switch (window.type) {
    case 'gateIn':
      content = <GateInPanel {...window} />;
      break;
    case 'flow':
      content = (
        <div className="p-4 text-sm text-muted-foreground">
          <strong>Flow Editor</strong> has been replaced by the new <code>workflowEditor</code> system.
        </div>
      );
      break;
    case 'flow3d':
      content = <Flow3DWindow {...window} />;
      break;
    case 'copilot':
      content = <CopilotPanel window={window} />;
      break;
    case 'adapters':
      content = <AdaptersManager {...window} />;
      break;
    case 'agentDashboard':
      content = <AgentDashboard {...window} />;
      break;
    default:
      content = (
        <div className="p-4 text-sm text-muted-foreground">
          Unknown window type: <code>{window.type}</code>
        </div>
      );
  }

  return (
    <div className="rounded-md border border-card-foreground/20">
      <ErrorBoundary>{content}</ErrorBoundary>
    </div>
  );
}

